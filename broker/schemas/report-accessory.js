NEWSCHEMA('ReportAccessory', function (schema) {

	schema.setQuery(function ($,model) {

		console.log($.params);

		DBMS().find('integraciones.accessory')
			.between('creation_date', $.params.fechainicio, $.params.fechafin)
			.callback($.callback);

	});

});
