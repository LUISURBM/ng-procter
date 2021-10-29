NEWSCHEMA('Planning', function (schema) {
	schema.define('loadid', Number);
	schema.define('reg_status', 'String(1)', true);
	schema.define('drivername', 'String(80)', true);
	schema.define('loadorderid', 'String(20)', true);
	schema.define('licenseplate', 'String(20)', true);
	schema.define('drivercc', 'String(20)', true);

	schema.setQuery(async function ($) {

		// Performs automatically pagination, sort and all checks
		// DBMS().list('integraciones.planning').autofill($, 'creation_date:Date,last_update:Date', 'id', 'creation_date_desc', 50).callback($.callback);
		var plannings = await DBMS().debug().find('integraciones.planning')
			.join('delivery', 'integraciones.planning_delivery').on('loadid', 'loadid')
			.join('invoice', 'integraciones.invoice').on('loadid', 'loadid')
			.join('product', 'integraciones.invoice_product').on('loadid', 'loadid')
			.promise();
		// console.log(plannings)
		// var data = plannings.filter(p => !p.loadorderid);
		$.callback(plannings);
		// Or you can use a simple query via:
		// DBMS().find('integraciones.planning').callback($.callback);

	});

	schema.setRead(function ($) {

		// Performs query
		// 404 error will be returned if the no records won't be updated
		console.log($.controller.id)
		DBMS().find('integraciones.planning').search('loadid', $.controller.id).error(404).callback($.callback);

	});

	schema.setInsert(function ($, model) {

		// Assigns additional values
		model.loadid = UID();
		model.last_update = new Date();
		model.user_update = 'PROCTER';

		// Performs query
		DBMS().insert('integraciones.planning', model).log($, model).callback($.done(model.loadid));

	});

	schema.setUpdate(function ($, model) {

		// Assigns additional values
		model.last_update = new Date();

		// Performs query
		// 404 error will be returned if the no records won't be updated
		console.log(model);
		DBMS().modify('integraciones.planning', model).where('loadid', model.loadid).log($, model).error(404).callback($.done($.loadid));

	});

	schema.setRemove(function ($) {

		// 404 error will be returned if the no records won't be updated
		DBMS().remove('integraciones.planning').loadid($.loadid).log($).error(404).callback($.done($.loadid));

	});

});