from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from PIL import Image
DRIVER_PATH = '/Users/alisonwong/Documents/chromedriver'
options = Options()
options.headless = True
options.add_argument("--window-size=1920,1200")

# This script will work with any Old Navy or Gap Link, to test, change the PRODUCT_URL variable 

# find a way to get the url or brand namefrom the front end 
# which will be sent to the backend for info 
PRODUCT_URL = "https://www.gapcanada.ca/browse/product.do?pid=544841223&rrec=true&mlink=5050,12413545,PDP_gapproduct2_rr_4&clink=12413545#pdp-page-content"
driver = webdriver.Chrome(options=options, executable_path=DRIVER_PATH)

# product page 
driver.get(PRODUCT_URL)
driver.save_screenshot('test_screenshots/ss_orig screen.png')
try: 
    promo_box = driver.find_element_by_class_name('is-expanded')
    promo_box.click()
except: 
    pass

# product title
product_name = driver.find_element_by_class_name('product-title__text').text

# Product details 
product_overview = driver.find_element_by_class_name("product-information-item__overview").text
product_details_raw = driver.find_elements_by_class_name("product-information-item__list-item")
product_details = []
for detail in product_details_raw: 
    product_details.append(detail.text)

# Product picture / color
product_color = driver.find_element_by_xpath("//*[@id='swatch-label--Color']").text
product_color = product_color[7:]

driver.save_screenshot('test_screenshots/ss_finished screen.png')
print('product page title: ' + driver.title)
print ('product name html: ' + product_name)
print('product overview: ')
print(product_overview)
print('product details: ')
print(product_details)
print('product color: ' + product_color)
driver.quit() 
