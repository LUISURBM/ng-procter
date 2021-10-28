NEWSCHEMA('Usuarios', function (schema) {

	schema.define('userid', 'String', true);


	schema.setInsert(async function ($, model) {

		// Assigns additional values
		console.log('insert user')
		
		const usuarios = await DBMS().debug().list('integraciones.usuarios').promise();
		// console.table(usuarios)
		model.user = usuarios.count +1;
		console.log(model);
		// Performs query
		DBMS().debug().insert('integraciones.usuarios', model).log($, model).callback($.done(model));

	});


});