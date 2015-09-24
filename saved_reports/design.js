reports({
	"queries": [
		{
			"title": "**Responsive Templates**",
			"query": "UPDATE ConfigSetup SET datavalue = 'Below Product Description' WHERE dataname = 'Config_ProductPage_Position_RelatedProductsAndAccessories'\n\nUPDATE ConfigSetup SET datavalue = 'Y' WHERE dataname = 'Config_EnableSEOFriendly'\n\nUPDATE ConfigSetup SET datavalue = 'N' WHERE dataname = 'Config_HomePage_Force_FeaturedProductsImg'\n\nUPDATE ConfigSetup SET datavalue = 'N' WHERE dataname = 'Config_HomePage_EnableWelcomeText'\n\nUPDATE ConfigSetup SET datavalue = 'N' WHERE dataname = 'Config_SliderEnabled'\n\nUPDATE Categories SET Category_DisplayMode_Responsive = '7'"
		}
	]
});