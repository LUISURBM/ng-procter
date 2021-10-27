NEWSCHEMA('Accessory', function (schema) {

	schema.define('reg_status', String);
	schema.define('loadorderid', 'String', true);
	schema.define('loadid', Number);
	schema.define('requesteddate', 'Date', true);
	schema.define('customerid', Number);
	schema.define('delieveryid', Number);
	schema.define('accessorytype', 'String', false);
	schema.define('costoverrun', Number, true);
	schema.define('quantity', Number, true);
	schema.define('salesunit', 'String', true);
	schema.define('comentarios', 'String', false);

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

	schema.setInsert(function ($, model) {

		// Assigns additional values
		model.last_update = new Date();
		model.user_update = 'PROCTER';
		console.log('insert accessory')
		console.log(model)
		// Performs query
		DBMS().debug().insert('integraciones.accessory', model).log($, model).callback($.done(model.loadid));

	});

});