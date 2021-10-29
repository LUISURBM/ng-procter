NEWSCHEMA('ReportReturn', function (schema) {

	schema.setQuery(function ($, model) {

		console.log($.params);

		DBMS().find('integraciones.returns')
			.between('creation_date', $.params.fechainicio, $.params.fechafin)
			.callback($.callback);

	});

});
