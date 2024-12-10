/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Authorigins = "_authOrigins",
	Externalauths = "_externalAuths",
	Mfas = "_mfas",
	Otps = "_otps",
	Superusers = "_superusers",
	Contacts = "contacts",
	EmailTemplates = "emailTemplates",
	Files = "files",
	Geodata = "geodata",
	HistoryItems = "historyItems",
	Insurances = "insurances",
	Invites = "invites",
	JobPositions = "jobPositions",
	NotificationTypes = "notificationTypes",
	Notifications = "notifications",
	OutcomeTypes = "outcomeTypes",
	Outcomes = "outcomes",
	ParsedAgents = "parsed_agents",
	Permissions = "permissions",
	Professions = "professions",
	RepeatValues = "repeatValues",
	Roles = "roles",
	Schemas = "schemas",
	Selections = "selections",
	Statuses = "statuses",
	TaskTypes = "taskTypes",
	Tasks = "tasks",
	TeamSettings = "teamSettings",
	Teams = "teams",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AuthoriginsRecord = {
	collectionRef: string
	created?: IsoDateString
	fingerprint: string
	id: string
	recordRef: string
	updated?: IsoDateString
}

export type ExternalauthsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	provider: string
	providerId: string
	recordRef: string
	updated?: IsoDateString
}

export type MfasRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	method: string
	recordRef: string
	updated?: IsoDateString
}

export type OtpsRecord = {
	collectionRef: string
	created?: IsoDateString
	id: string
	password: string
	recordRef: string
	sentTo?: string
	updated?: IsoDateString
}

export type SuperusersRecord = {
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

export type ContactsRecord<Tcustom_fields = unknown> = {
	agent_status?: string
	bonus?: number
	change_motivation?: string
	city?: string
	commission_sales?: number
	company?: string
	country?: string
	created?: IsoDateString
	created_at?: IsoDateString
	credit_agency_city?: string
	credit_agency_email1?: string
	credit_agency_email2?: string
	credit_agency_mobile1?: string
	credit_agency_mobile2?: string
	credit_agency_phone1?: string
	credit_agency_phone2?: string
	credit_agency_postal_code?: string
	credit_agency_state?: string
	credit_agency_street?: string
	custom_fields?: null | Tcustom_fields
	date_of_birth?: IsoDateString
	deleted_at?: IsoDateString
	desired_profession?: RecordIdString
	email?: string
	employed_since?: IsoDateString
	fav_reg_no?: string
	first_name?: string
	gdpr_agreed_at?: IsoDateString
	gdpr_informed_at?: IsoDateString
	id: string
	ihk_city?: string
	ihk_name?: string
	ihk_postal_code?: string
	ihk_state?: string
	ihk_street?: string
	initial_commission?: number
	insurance?: RecordIdString
	insurance_city?: string
	insurance_email?: string
	insurance_extras?: string
	insurance_homepage?: string
	insurance_job?: string
	insurance_job_2?: string
	insurance_lat?: number
	insurance_long?: number
	insurance_mobile?: string
	insurance_phone?: string
	insurance_postal_code?: string
	insurance_street?: string
	interesting_for_age_succession?: boolean
	is_employee?: boolean
	is_informal?: boolean
	is_interested?: boolean
	job_position?: RecordIdString
	last_name?: string
	lat?: number
	link_vvr?: string
	link_vvr_pdf?: string
	long?: number
	member_at?: IsoDateString
	mobile?: string
	money?: number
	number_of_employees?: string
	opened_by?: RecordIdString
	parsingId?: number
	phone?: string
	phone_book_mobile?: string
	phone_book_phone?: string
	portfolio_size_automobile?: number
	portfolio_size_life?: number
	portfolio_size_property?: number
	portfolio_size_total?: number
	postal_code?: string
	previous_insurer_since?: IsoDateString
	profession?: RecordIdString
	rating?: number
	reg_no?: string
	renewal_comission?: number
	salutation?: string
	score?: number
	state?: string
	status?: RecordIdString
	street?: string
	team?: RecordIdString
	title?: string
	turnover?: number
	updated?: IsoDateString
	updated_at?: IsoDateString
	vvr_city?: string
	vvr_first_name?: string
	vvr_last_name?: string
	vvr_reg_no?: string
	wik_reg_no?: string
	year_of_birth?: number
}

export type EmailTemplatesRecord = {
	body?: string
	created?: IsoDateString
	deleted_at?: IsoDateString
	files?: string[]
	id: string
	name?: string
	subject?: string
	teamId?: RecordIdString
	updated?: IsoDateString
}

export type FilesRecord = {
	comment?: string
	contact?: RecordIdString
	created?: IsoDateString
	creator?: RecordIdString
	deleted_at?: IsoDateString
	files?: string[]
	id: string
	pinned?: boolean
	team?: RecordIdString
	title?: string
	type?: string
	updated?: IsoDateString
}

export type GeodataRecord = {
	bundesland_name?: string
	bundesland_nutscode?: string
	created?: IsoDateString
	gemeinde_ags?: string
	gemeinde_lat?: string
	gemeinde_lon?: string
	gemeinde_name?: string
	gemeinde_rs?: string
	gemeinde_typ?: string
	id: string
	kreis_name?: string
	kreis_nutscode?: string
	kreis_typ?: string
	ort_id?: string
	ort_lat?: string
	ort_lon?: string
	ort_name?: string
	postleitzahl?: string
	regierungsbezirk_name?: string
	regierungsbezirk_nutscode?: string
	updated?: IsoDateString
}

export enum HistoryItemsTypeOptions {
	"email" = "email",
	"call" = "call",
}
export type HistoryItemsRecord = {
	attachment_url?: string
	contact?: RecordIdString
	created?: IsoDateString
	created_by?: RecordIdString
	deleted_at?: IsoDateString
	description?: string
	id: string
	team?: RecordIdString
	third_party_id?: string
	title?: string
	type?: HistoryItemsTypeOptions
	updated?: IsoDateString
}

export type InsurancesRecord = {
	created?: IsoDateString
	id: string
	name?: string
	parsingId?: number
	updated?: IsoDateString
}

export type InvitesRecord = {
	accepted_at?: IsoDateString
	created?: IsoDateString
	created_by?: RecordIdString
	date_expiring?: IsoDateString
	deleted_at?: IsoDateString
	email?: string
	id: string
	team?: RecordIdString
	updated?: IsoDateString
	user?: RecordIdString
}

export type JobPositionsRecord = {
	created?: IsoDateString
	id: string
	name?: string
	updated?: IsoDateString
}

export type NotificationTypesRecord = {
	created?: IsoDateString
	id: string
	name?: string
	updated?: IsoDateString
}

export type NotificationsRecord = {
	created?: IsoDateString
	deleted_at?: IsoDateString
	expires_at?: IsoDateString
	id: string
	message?: string
	read_at?: IsoDateString
	type?: RecordIdString
	updated?: IsoDateString
	url?: string
	user?: RecordIdString
}

export type OutcomeTypesRecord = {
	created?: IsoDateString
	deleted_at?: IsoDateString
	id: string
	is_archived?: boolean
	is_default?: boolean
	label?: string
	name?: string
	team?: RecordIdString
	updated?: IsoDateString
}

export type OutcomesRecord = {
	contact?: RecordIdString
	created?: IsoDateString
	created_by?: RecordIdString
	datetime?: IsoDateString
	deleted_at?: IsoDateString
	id: string
	team?: RecordIdString
	type?: RecordIdString
	updated?: IsoDateString
}

export type ParsedAgentsRecord<Tcustom_fields = unknown> = {
	agent_status?: string
	bonus?: number
	change_motivation?: string
	city?: string
	commission_sales?: number
	company?: string
	country?: string
	created?: IsoDateString
	created_at?: IsoDateString
	credit_agency_city?: string
	credit_agency_email1?: string
	credit_agency_email2?: string
	credit_agency_mobile1?: string
	credit_agency_mobile2?: string
	credit_agency_phone1?: string
	credit_agency_phone2?: string
	credit_agency_postal_code?: string
	credit_agency_state?: string
	credit_agency_street?: string
	custom_fields?: null | Tcustom_fields
	date_of_birth?: IsoDateString
	deleted_at?: IsoDateString
	desired_profession?: RecordIdString
	email?: string
	employed_since?: IsoDateString
	fav_reg_no?: string
	first_name?: string
	id: string
	ihk_city?: string
	ihk_name?: string
	ihk_postal_code?: string
	ihk_state?: string
	ihk_street?: string
	initial_commission?: number
	insurance?: RecordIdString
	insurance_city?: string
	insurance_email?: string
	insurance_extras?: string
	insurance_homepage?: string
	insurance_job?: string
	insurance_job_2?: string
	insurance_lat?: number
	insurance_long?: number
	insurance_mobile?: string
	insurance_phone?: string
	insurance_postal_code?: string
	insurance_street?: string
	interesting_for_age_succession?: boolean
	is_employee?: boolean
	is_interested?: boolean
	job_position?: RecordIdString
	last_name?: string
	lat?: number
	link_vvr?: string
	link_vvr_pdf?: string
	long?: number
	member_at?: IsoDateString
	mobile?: string
	money?: number
	number_of_employees?: string
	opened_by?: RecordIdString
	parsingId?: number
	phone?: string
	phone_book_mobile?: string
	phone_book_phone?: string
	portfolio_size_automobile?: number
	portfolio_size_life?: number
	portfolio_size_property?: number
	portfolio_size_total?: number
	postal_code?: string
	previous_insurer_since?: IsoDateString
	profession?: RecordIdString
	reg_no?: string
	renewal_comission?: number
	resubmission?: IsoDateString
	salutation?: string
	score?: number
	state?: string
	street?: string
	team?: RecordIdString
	title?: string
	turnover?: number
	updated?: IsoDateString
	updated_at?: IsoDateString
	vvr_city?: string
	vvr_first_name?: string
	vvr_last_name?: string
	vvr_reg_no?: string
	wik_reg_no?: string
	year_of_birth?: number
}

export type PermissionsRecord = {
	created?: IsoDateString
	id: string
	name?: string
	updated?: IsoDateString
}

export type ProfessionsRecord = {
	created?: IsoDateString
	id: string
	key?: number
	name?: string
	parsingId?: number
	short?: string
	updated?: IsoDateString
}

export type RepeatValuesRecord = {
	created?: IsoDateString
	days?: number
	id: string
	months?: number
	readable_id?: string
	updated?: IsoDateString
	weeks?: number
	years?: number
}

export type RolesRecord = {
	created?: IsoDateString
	deleted_at?: IsoDateString
	id: string
	is_default?: boolean
	is_editable?: boolean
	label?: string
	name?: string
	permissions?: RecordIdString[]
	team?: RecordIdString
	updated?: IsoDateString
	users?: RecordIdString[]
}

export type SchemasRecord<Tschema_json = unknown> = {
	created?: IsoDateString
	id: string
	schema_json?: null | Tschema_json
	team?: RecordIdString
	updated?: IsoDateString
}

export type SelectionsRecord = {
	contacts?: RecordIdString[]
	created?: IsoDateString
	deleted_at?: IsoDateString
	id: string
	is_default?: boolean
	name?: string
	team?: RecordIdString
	updated?: IsoDateString
}

export type StatusesRecord = {
	created?: IsoDateString
	id: string
	readable_id?: string
	updated?: IsoDateString
}

export type TaskTypesRecord = {
	created?: IsoDateString
	deleted_at?: IsoDateString
	id: string
	is_archived?: boolean
	is_default?: boolean
	is_repeatable?: boolean
	label?: string
	name?: string
	team?: RecordIdString
	updated?: IsoDateString
}

export type TasksRecord = {
	contact?: RecordIdString
	created?: IsoDateString
	created_by?: RecordIdString
	datetime?: IsoDateString
	deleted_at?: IsoDateString
	done?: boolean
	follow_up_task?: RecordIdString
	id: string
	note?: string
	repeat?: RecordIdString
	responsible?: RecordIdString
	team?: RecordIdString
	type?: RecordIdString
	updated?: IsoDateString
}

export type TeamSettingsRecord<Tcontact_fields_layout = unknown> = {
	contact_fields_layout?: null | Tcontact_fields_layout
	created?: IsoDateString
	field?: RecordIdString
	id: string
	updated?: IsoDateString
}

export type TeamsRecord = {
	brand_color_as_hex?: string
	created?: IsoDateString
	deleted_at?: IsoDateString
	id: string
	logo?: string
	name: string
	updated?: IsoDateString
	users?: RecordIdString[]
}

export type UsersRecord = {
	avatar?: string
	city?: string
	communication_free_text?: string
	company?: string
	country?: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	email_signature?: string
	greeting_company?: string
	greeting_formal_female?: string
	greeting_formal_neutral?: string
	greeting_formale_male?: string
	greeting_informal_female?: string
	greeting_informal_male?: string
	greeting_informal_neutral?: string
	handwritten_signature?: string
	id: string
	invite?: RecordIdString
	job?: string
	last_login?: IsoDateString
	last_viewed_contact?: RecordIdString
	lat?: number
	lng?: number
	mobile?: string
	name?: string
	needs_mfa?: boolean
	password: string
	phone?: string
	placetel_api_key?: string
	placetel_sipuid?: string
	postal_code?: string
	smtp_encryption?: string
	smtp_from_address?: string
	smtp_from_name?: string
	smtp_host?: string
	smtp_password?: string
	smtp_port?: string
	smtp_username?: string
	state?: string
	street?: string
	title?: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
	voip_api_token?: string
	voip_secret?: string
	voip_sip_user?: string
	voip_webhook?: string
}

// Response types include system fields and match responses from the PocketBase API
export type AuthoriginsResponse<Texpand = unknown> = Required<AuthoriginsRecord> & BaseSystemFields<Texpand>
export type ExternalauthsResponse<Texpand = unknown> = Required<ExternalauthsRecord> & BaseSystemFields<Texpand>
export type MfasResponse<Texpand = unknown> = Required<MfasRecord> & BaseSystemFields<Texpand>
export type OtpsResponse<Texpand = unknown> = Required<OtpsRecord> & BaseSystemFields<Texpand>
export type SuperusersResponse<Texpand = unknown> = Required<SuperusersRecord> & AuthSystemFields<Texpand>
export type ContactsResponse<Tcustom_fields = unknown, Texpand = unknown> = Required<ContactsRecord<Tcustom_fields>> & BaseSystemFields<Texpand>
export type EmailTemplatesResponse<Texpand = unknown> = Required<EmailTemplatesRecord> & BaseSystemFields<Texpand>
export type FilesResponse<Texpand = unknown> = Required<FilesRecord> & BaseSystemFields<Texpand>
export type GeodataResponse<Texpand = unknown> = Required<GeodataRecord> & BaseSystemFields<Texpand>
export type HistoryItemsResponse<Texpand = unknown> = Required<HistoryItemsRecord> & BaseSystemFields<Texpand>
export type InsurancesResponse<Texpand = unknown> = Required<InsurancesRecord> & BaseSystemFields<Texpand>
export type InvitesResponse<Texpand = unknown> = Required<InvitesRecord> & BaseSystemFields<Texpand>
export type JobPositionsResponse<Texpand = unknown> = Required<JobPositionsRecord> & BaseSystemFields<Texpand>
export type NotificationTypesResponse<Texpand = unknown> = Required<NotificationTypesRecord> & BaseSystemFields<Texpand>
export type NotificationsResponse<Texpand = unknown> = Required<NotificationsRecord> & BaseSystemFields<Texpand>
export type OutcomeTypesResponse<Texpand = unknown> = Required<OutcomeTypesRecord> & BaseSystemFields<Texpand>
export type OutcomesResponse<Texpand = unknown> = Required<OutcomesRecord> & BaseSystemFields<Texpand>
export type ParsedAgentsResponse<Tcustom_fields = unknown, Texpand = unknown> = Required<ParsedAgentsRecord<Tcustom_fields>> & BaseSystemFields<Texpand>
export type PermissionsResponse<Texpand = unknown> = Required<PermissionsRecord> & BaseSystemFields<Texpand>
export type ProfessionsResponse<Texpand = unknown> = Required<ProfessionsRecord> & BaseSystemFields<Texpand>
export type RepeatValuesResponse<Texpand = unknown> = Required<RepeatValuesRecord> & BaseSystemFields<Texpand>
export type RolesResponse<Texpand = unknown> = Required<RolesRecord> & BaseSystemFields<Texpand>
export type SchemasResponse<Tschema_json = unknown, Texpand = unknown> = Required<SchemasRecord<Tschema_json>> & BaseSystemFields<Texpand>
export type SelectionsResponse<Texpand = unknown> = Required<SelectionsRecord> & BaseSystemFields<Texpand>
export type StatusesResponse<Texpand = unknown> = Required<StatusesRecord> & BaseSystemFields<Texpand>
export type TaskTypesResponse<Texpand = unknown> = Required<TaskTypesRecord> & BaseSystemFields<Texpand>
export type TasksResponse<Texpand = unknown> = Required<TasksRecord> & BaseSystemFields<Texpand>
export type TeamSettingsResponse<Tcontact_fields_layout = unknown, Texpand = unknown> = Required<TeamSettingsRecord<Tcontact_fields_layout>> & BaseSystemFields<Texpand>
export type TeamsResponse<Texpand = unknown> = Required<TeamsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	_authOrigins: AuthoriginsRecord
	_externalAuths: ExternalauthsRecord
	_mfas: MfasRecord
	_otps: OtpsRecord
	_superusers: SuperusersRecord
	contacts: ContactsRecord
	emailTemplates: EmailTemplatesRecord
	files: FilesRecord
	geodata: GeodataRecord
	historyItems: HistoryItemsRecord
	insurances: InsurancesRecord
	invites: InvitesRecord
	jobPositions: JobPositionsRecord
	notificationTypes: NotificationTypesRecord
	notifications: NotificationsRecord
	outcomeTypes: OutcomeTypesRecord
	outcomes: OutcomesRecord
	parsed_agents: ParsedAgentsRecord
	permissions: PermissionsRecord
	professions: ProfessionsRecord
	repeatValues: RepeatValuesRecord
	roles: RolesRecord
	schemas: SchemasRecord
	selections: SelectionsRecord
	statuses: StatusesRecord
	taskTypes: TaskTypesRecord
	tasks: TasksRecord
	teamSettings: TeamSettingsRecord
	teams: TeamsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	_authOrigins: AuthoriginsResponse
	_externalAuths: ExternalauthsResponse
	_mfas: MfasResponse
	_otps: OtpsResponse
	_superusers: SuperusersResponse
	contacts: ContactsResponse
	emailTemplates: EmailTemplatesResponse
	files: FilesResponse
	geodata: GeodataResponse
	historyItems: HistoryItemsResponse
	insurances: InsurancesResponse
	invites: InvitesResponse
	jobPositions: JobPositionsResponse
	notificationTypes: NotificationTypesResponse
	notifications: NotificationsResponse
	outcomeTypes: OutcomeTypesResponse
	outcomes: OutcomesResponse
	parsed_agents: ParsedAgentsResponse
	permissions: PermissionsResponse
	professions: ProfessionsResponse
	repeatValues: RepeatValuesResponse
	roles: RolesResponse
	schemas: SchemasResponse
	selections: SelectionsResponse
	statuses: StatusesResponse
	taskTypes: TaskTypesResponse
	tasks: TasksResponse
	teamSettings: TeamSettingsResponse
	teams: TeamsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: '_authOrigins'): RecordService<AuthoriginsResponse>
	collection(idOrName: '_externalAuths'): RecordService<ExternalauthsResponse>
	collection(idOrName: '_mfas'): RecordService<MfasResponse>
	collection(idOrName: '_otps'): RecordService<OtpsResponse>
	collection(idOrName: '_superusers'): RecordService<SuperusersResponse>
	collection(idOrName: 'contacts'): RecordService<ContactsResponse>
	collection(idOrName: 'emailTemplates'): RecordService<EmailTemplatesResponse>
	collection(idOrName: 'files'): RecordService<FilesResponse>
	collection(idOrName: 'geodata'): RecordService<GeodataResponse>
	collection(idOrName: 'historyItems'): RecordService<HistoryItemsResponse>
	collection(idOrName: 'insurances'): RecordService<InsurancesResponse>
	collection(idOrName: 'invites'): RecordService<InvitesResponse>
	collection(idOrName: 'jobPositions'): RecordService<JobPositionsResponse>
	collection(idOrName: 'notificationTypes'): RecordService<NotificationTypesResponse>
	collection(idOrName: 'notifications'): RecordService<NotificationsResponse>
	collection(idOrName: 'outcomeTypes'): RecordService<OutcomeTypesResponse>
	collection(idOrName: 'outcomes'): RecordService<OutcomesResponse>
	collection(idOrName: 'parsed_agents'): RecordService<ParsedAgentsResponse>
	collection(idOrName: 'permissions'): RecordService<PermissionsResponse>
	collection(idOrName: 'professions'): RecordService<ProfessionsResponse>
	collection(idOrName: 'repeatValues'): RecordService<RepeatValuesResponse>
	collection(idOrName: 'roles'): RecordService<RolesResponse>
	collection(idOrName: 'schemas'): RecordService<SchemasResponse>
	collection(idOrName: 'selections'): RecordService<SelectionsResponse>
	collection(idOrName: 'statuses'): RecordService<StatusesResponse>
	collection(idOrName: 'taskTypes'): RecordService<TaskTypesResponse>
	collection(idOrName: 'tasks'): RecordService<TasksResponse>
	collection(idOrName: 'teamSettings'): RecordService<TeamSettingsResponse>
	collection(idOrName: 'teams'): RecordService<TeamsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
