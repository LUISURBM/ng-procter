NEWSCHEMA('Tablagen', function (schema) {

	schema.define('loadid', Number);

	schema.setQuery(function ($) {

		// Performs automatically pagination, sort and all checks
		// DBMS().list('integraciones.planning').autofill($, 'creation_date:Date,last_update:Date', 'id', 'creation_date_desc', 50).callback($.callback);
		DBMS().find('integraciones.tablagen').callback($.callback);
		// Or you can use a simple query via:
		// DBMS().find('integraciones.planning').callback($.callback);

	});

	schema.setRead(function ($) {

		// Performs query
		// 404 error will be returned if the no records won't be updated
		DBMS().read('integraciones.tablagen').table_type($.table_type).error(404).callback($.callback);

	});


});