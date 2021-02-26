from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from PIL import Image
DRIVER_PATH = '/Users/alisonwong/Documents/chromedriver'
options = Options()
options.headless = True
options.add_argument("--window-size=1920,1200")

# find a way to get the url or brand namefrom the front end 
# which will be sent to the backend for info 
PRODUCT_URL = "https://oldnavy.gapcanada.ca/browse/product.do?pid=551203023&cid=1127533&pcid=35158&vid=1&nav=meganav%3AWomen%3AShop%20Women%27s%20Categories%3AShorts&grid=pds_6_52_1#pdp-page-content"
driver = webdriver.Chrome(options=options, executable_path=DRIVER_PATH)

# product page 
driver.get(PRODUCT_URL)
driver.save_screenshot('ss_orig screen.png')
try: 
    promo_box = driver.find_element_by_class_name('is-expanded')
    promo_box.click()
except: 
    pass

# The product title is : (h1)
product_name = driver.find_element_by_class_name('product-title__text').text

# Product details 
product_details_raw = driver.find_elements_by_class_name("product-information-item__list-item")
product_details = []
for detail in product_details_raw: 
    product_details.append(detail.text)

# Product picture 
product_color = driver.find_element_by_xpath("//*[@id='swatch-label--Color']").text
product_color = product_color[7:]

driver.save_screenshot('ss_finished screen.png')
print('product page title: ' + driver.title)
print ('product name html: ' + product_name)
# print ('brand home page title: ' + brand_name)
print('product details: ')
print(product_details)
print('product color: ' + product_color)
print(product_color_img_src)
driver.quit()
