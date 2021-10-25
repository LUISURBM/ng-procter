NEWSCHEMA('Dashboard', function (schema) {
	schema.define('loadid', Number);
	schema.define('drivername', 'String(80)', true);
	schema.define('loadorderid', 'String(20)', true);
	schema.define('licenseplate', 'String(20)', true);
	schema.define('drivercc', 'String(20)', true);

	schema.setQuery(async function ($) {

		// Performs automatically pagination, sort and all checks
		// DBMS().list('integraciones.planning').autofill($, 'creation_date:Date,last_update:Date', 'id', 'creation_date_desc', 50).callback($.callback);
		var planning = await DBMS().debug().find('integraciones.planning').callback($);
		var delivery = await DBMS().debug().find('integraciones.planning_delivery').callback($);
		var invoice = await DBMS().debug().find('integraciones.invoice').callback($);
		var invoice_product = await DBMS().debug().find('integraciones.invoice_product').callback($);
		var rejects = await DBMS().debug().find('integraciones.rejects').callback($);
		// .join('delivery', 'integraciones.planning_delivery').on('loadid', 'loadid')
		// .join('invoice', 'integraciones.invoice').on('loadid', 'loadid')
		// .join('product', 'integraciones.invoice_product').on('loadid', 'loadid')
		// .promise();
		// console.log(plannings)
		// var data = plannings.filter(p => !p.loadorderid);
		$.callback({ planning: planning, delivery: delivery, invoice_product: invoice_product, invoice: invoice, rejects: rejects });
		// Or you can use a simple query via:
		// DBMS().find('integraciones.planning').callback($.callback);

	});


});