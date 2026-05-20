from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1400, 'height': 1200})
    page.goto('http://localhost:8000')
    time.sleep(2)

    # Scroll até a seção "Como funciona na prática"
    page.evaluate('''() => {
        const grid = document.querySelector(".modal-how-grid");
        if (grid) {
            grid.scrollIntoView({behavior: 'auto', block: 'center'});
        }
    }''')
    time.sleep(1)

    page.screenshot(path='screenshot_modal.png')
    browser.close()
    print("✓ Screenshot salva em screenshot_modal.png")
