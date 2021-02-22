from selenium import webdriver
from selenium.webdriver.chrome.options import Options
# from webdriver_manager.chrome import ChromeDriverManager
# driver = webdriver.Chrome(ChromeDriverManager().install())
DRIVER_PATH = '/Users/alisonwong/Documents/chromedriver'

# driver = webdriver.Chrome(executable_path=DRIVER_PATH)
# driver.get('https://google.com')

options = Options()
options.headless = True
options.add_argument("--window-size=1920,1200")

driver = webdriver.Chrome(options=options, executable_path=DRIVER_PATH)
driver.get("https://www.nintendo.com/")
print(driver.page_source)
driver.quit()