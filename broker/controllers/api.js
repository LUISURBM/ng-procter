exports.install = function() {
	CORS();

	ROUTE('GET     /', index);

	// Dashboard
	ROUTE('GET     /api/dashboard/        *Dashboard --> query');

	// Planning
	ROUTE('GET     /api/planning/        *Planning --> query');
	ROUTE('GET     /api/planning/{id}/   *Planning --> read');
	ROUTE('POST    /api/planning/        *Planning --> insert');
	ROUTE('PUT     /api/planning/{id}/   *Planning --> update');
	ROUTE('DELETE  /api/planning/{id}/   *Planning --> remove');

	// Reject
	ROUTE('GET     /api/rejects/        *Rejects --> query');
	ROUTE('POST    /api/rejects/        *Rejects --> insert');

	// Invoice
	ROUTE('GET     /api/invoice/        *Invoice --> query');

	// Accessory
	ROUTE('GET     /api/accessory/        *Accessory --> query');
	ROUTE('POST    /api/accessory/        *Accessory --> insert');

	// Reject
	ROUTE('GET     /api/return/        *Return --> query');
	ROUTE('POST    /api/return/        *Return --> insert');

	// Tablagen
	ROUTE('GET     /api/tablagen/        *Tablagen --> query');
	ROUTE('GET     /api/tablagen/{id}/   *Tablagen --> read');

	// Report
	ROUTE('GET     /api/report/rejects/{fechainicio}/{fechafin}        *ReportReject --> query');
	ROUTE('GET     /api/report/returns/{fechainicio}/{fechafin}        *ReportReturn --> query');
	ROUTE('GET     /api/report/accessories/{fechainicio}/{fechafin}    *ReportAccessory --> query');

	// Usuarios
	ROUTE('POST     /api/usuarios/        *Usuarios --> insert');
};

function index() {
	this.plain('PostgreSQL API example');
}