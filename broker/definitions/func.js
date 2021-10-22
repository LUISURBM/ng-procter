// Loads app configuration from database
FUNC.refresh_config = function(callback) {
	DBMS().find('integraciones.planning').fields('loadid,loadorderid,creation_date').data(function(response) {

		// The method below expects Array Object { id:String, type:String, value: string }
		// Value is automatically converted to defined type by the framework
		// More in documentation: Total.js/Globals section
		LOADCONFIG(response);

		callback && callback();
	});
};