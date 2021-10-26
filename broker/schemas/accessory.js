NEWSCHEMA('Accessory', function (schema) {

	schema.setQuery(async function ($) {

		// Performs automatically pagination, sort and all checks
		// DBMS().list('integraciones.planning').autofill($, 'creation_date:Date,last_update:Date', 'id', 'creation_date_desc', 50).callback($.callback);
		var accessory = await DBMS().debug().find('integraciones.accessory')
			.promise();
		// console.log(accessory)
		// var data = accessory.filter(p => !p.loadorderid);
		$.callback(accessory);
		// Or you can use a simple query via:
		// DBMS().find('integraciones.planning').callback($.callback);

	});


});