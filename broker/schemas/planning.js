NEWSCHEMA('Planning', function(schema) {

	schema.define('drivername', 'String(50)', true);
	schema.define('totalvolumesum', Number);

	schema.setQuery(function($) {

		// Performs automatically pagination, sort and all checks
		// DBMS().list('integraciones.planning').autofill($, 'creation_date:Date,last_update:Date', 'id', 'creation_date_desc', 50).callback($.callback);
		var builder = DBMS().find('integraciones.planning');
builder.join('delivery', 'integraciones.planning_delivery').on('loadid', 'loadid')
.join('invoice', 'integraciones.invoice').on('loadid', 'loadid')
.join('product', 'integraciones.invoice_product').on('loadid', 'loadid').callback($.callback);
		// Or you can use a simple query via:
		// DBMS().find('integraciones.planning').callback($.callback);

	});

	schema.setRead(function($) {

		// Performs query
		// 404 error will be returned if the no records won't be updated
		DBMS().read('integraciones.planning').loadid($.loadid).error(404).callback($.callback);

	});

	schema.setInsert(function($, model) {

		// Assigns additional values
		model.loadid = UID();
		model.last_update = new Date();
		model.user_update = 'PROCTER';

		// Performs query
		DBMS().insert('integraciones.planning', model).log($, model).callback($.done(model.loadid));

	});

	schema.setUpdate(function($, model) {

		// Assigns additional values
		model.last_update = new Date();

		// Performs query
		// 404 error will be returned if the no records won't be updated
		DBMS().modify('integraciones.planning', model).loadid($.loadid).log($, model).error(404).callback($.done($.loadid));

	});

	schema.setRemove(function($) {

		// 404 error will be returned if the no records won't be updated
		DBMS().remove('integraciones.planning').loadid($.loadid).log($).error(404).callback($.done($.loadid));

	});

});