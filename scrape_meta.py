import os
from datetime import datetime
from playwright.sync_api import sync_playwright
from feedgen.feed import FeedGenerator

def run():
    url = "https://www.facebook.com/business/news"
    
    with sync_playwright() as p:
        # Launch browser mimicking a standard desktop user
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
        
        # Go to the page and wait for the articles to render completely
        page.goto(url, wait_until="networkidle")
        page.wait_for_selector("h3")  
        
        # Initialize your RSS feed properties
        fg = FeedGenerator()
        fg.id(url)
        fg.title('Meta for Business News Feed')
        fg.link(href=url, rel='alternate')
        fg.description('Automated RSS updates for Meta Business Announcements')
        
        # Extract article data from the live browser DOM
        articles = page.query_selector_all("h3")
        
        for article in articles:
            title_text = article.inner_text().strip()
            if not title_text:
                continue
                
            # Locate the link surrounding or inside the header
            parent_link = article.query_selector("xpath=ancestor::a")
            if parent_link:
                link_href = parent_link.get_attribute("href")
            else:
                link_href = url
                
            if link_href.startswith('/'):
                link_href = "https://www.facebook.com" + link_href
                
            # Build the individual RSS item
            fe = fg.add_entry()
            fe.id(link_href)
            fe.title(title_text)
            fe.link(href=link_href)
            fe.pubDate(datetime.utcnow().replace(tzinfo=None))
            
        browser.close()
        
        # Save the finalized RSS file to your repository
        fg.rss_file('meta_business_news.xml')

if __name__ == "__main__":
    run()
