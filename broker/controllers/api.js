exports.install = function() {
	CORS();

	ROUTE('GET     /', index);

	// Planning
	ROUTE('GET     /api/planning/        *Planning --> query');
	ROUTE('GET     /api/planning/{id}/   *Planning --> read');
	ROUTE('POST    /api/planning/        *Planning --> insert');
	ROUTE('PUT     /api/planning/{id}/   *Planning --> update');
	ROUTE('DELETE  /api/planning/{id}/   *Planning --> remove');

};

function index() {
	this.plain('PostgreSQL API example');
}