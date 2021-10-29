NEWSCHEMA('ReportReject', function (schema) {

	schema.define('fechainicio', 'Date', true);
	schema.define('fechafin', 'Date', true);

	schema.setQuery(function ($, model) {

		// Performs automatically pagination, sort and all checks
		// DBMS().list('integraciones.planning').autofill($, 'creation_date:Date,last_update:Date', 'id', 'creation_date_desc', 50).callback($.callback);
		console.log(model);
		DBMS().find('integraciones.rejects')
			.between('creation_date',  $.params.fechainicio, $.params.fechafin)
			.callback($.callback);

	});

});
