NEWSCHEMA('Rejects', function (schema) {

	schema.define('loadid', Number);
	schema.define('rejectdate', 'Date', true);
	schema.define('quantity', Number);
	schema.define('reason', Number);
	schema.define('loadorderid', 'String', true);
	schema.define('deliveryid', Number, true);
	schema.define('invoiceid', Number, true);
	schema.define('commentario', 'String', true);

	schema.setQuery(function ($) {

		// Performs automatically pagination, sort and all checks
		// DBMS().list('integraciones.planning').autofill($, 'creation_date:Date,last_update:Date', 'id', 'creation_date_desc', 50).callback($.callback);
		var builder = DBMS().find('integraciones.rejects');
		
		builder.join('tablagen', 'integraciones.tablagen').on('rejecttype', 'table_type')
			.join('invoice', 'integraciones.invoice').on('loadid', 'loadid')
			.join('product', 'integraciones.invoice_product').on('loadid', 'loadid')
			.callback($.callback);
		// Or you can use a simple query via:
		// DBMS().find('integraciones.planning').callback($.callback);

	});


	schema.setInsert(function ($, model) {

		// Assigns additional values
		model.last_update = new Date();
		model.user_update = 'PROCTER';
		console.log('insert reject')
		console.log(model)
		// Performs query
		DBMS().debug().insert('integraciones.rejects', model).log($, model).callback($.done(model.loadid));

	});


});