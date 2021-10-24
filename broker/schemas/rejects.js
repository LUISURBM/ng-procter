NEWSCHEMA('Rejects', function (schema) {

	schema.define('loadid', Number);

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

	schema.setRead(function ($) {

		// Performs query
		// 404 error will be returned if the no records won't be updated
		DBMS().read('integraciones.rejects').loadid($.loadid).error(404).callback($.callback);

	});

	schema.setInsert(function ($, model) {

		// Assigns additional values
		model.loadid = UID();
		model.last_update = new Date();
		model.user_update = 'PROCTER';

		// Performs query
		DBMS().insert('integraciones.rejects', model).log($, model).callback($.done(model.loadid));

	});

	schema.setUpdate(function ($, model) {

		// Assigns additional values
		model.last_update = new Date();

		// Performs query
		// 404 error will be returned if the no records won't be updated
		console.log(model);
		DBMS().modify('integraciones.rejects', model).where('loadid',model.loadid).log($, model).error(404).callback($.done($.loadid));

	});

	schema.setRemove(function ($) {

		// 404 error will be returned if the no records won't be updated
		DBMS().remove('integraciones.rejects').loadid($.loadid).log($).error(404).callback($.done($.loadid));

	});

});