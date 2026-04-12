export const PERMISSION_ACTIONS = {
  VIEW: 'view',
  ADD_NEW: 'add_new',
  UPDATE: 'update',
  MANAGE: 'manage',
} as const;

const permission = <TResource extends string, TAction extends string>(
  resource: TResource,
  action: TAction,
) => `${resource}.${action}` as const;

export const PERMISSIONS = {
  DASHBOARD_VIEW: permission('dashboard', PERMISSION_ACTIONS.VIEW),
  SCHOOL_VIEW: permission('school', PERMISSION_ACTIONS.VIEW),
  SCHOOL_ADD_NEW: permission('school', PERMISSION_ACTIONS.ADD_NEW),
  SCHOOL_UPDATE: permission('school', PERMISSION_ACTIONS.UPDATE),
  SCHOOL_MANAGE: permission('school', PERMISSION_ACTIONS.MANAGE),
  USER_VIEW: permission('user', PERMISSION_ACTIONS.VIEW),
  USER_UPDATE: permission('user', PERMISSION_ACTIONS.UPDATE),
  USER_MANAGE: permission('user', PERMISSION_ACTIONS.MANAGE),
  MODULE_VIEW: permission('module', PERMISSION_ACTIONS.VIEW),
  MODULE_UPDATE: permission('module', PERMISSION_ACTIONS.UPDATE),
  MODULE_MANAGE: permission('module', PERMISSION_ACTIONS.MANAGE),
  MESSAGE_VIEW: permission('message', PERMISSION_ACTIONS.VIEW),
  MESSAGE_MANAGE: permission('message', PERMISSION_ACTIONS.MANAGE),
  STUDENT_VIEW: permission('student', PERMISSION_ACTIONS.VIEW),
  STUDENT_ADD_NEW: permission('student', PERMISSION_ACTIONS.ADD_NEW),
  STUDENT_UPDATE: permission('student', PERMISSION_ACTIONS.UPDATE),
  STUDENT_MANAGE: permission('student', PERMISSION_ACTIONS.MANAGE),
  STAFF_VIEW: permission('staff', PERMISSION_ACTIONS.VIEW),
  STAFF_ADD_NEW: permission('staff', PERMISSION_ACTIONS.ADD_NEW),
  STAFF_UPDATE: permission('staff', PERMISSION_ACTIONS.UPDATE),
  STAFF_MANAGE: permission('staff', PERMISSION_ACTIONS.MANAGE),
  FEES_VIEW: permission('fees', PERMISSION_ACTIONS.VIEW),
  FEES_UPDATE: permission('fees', PERMISSION_ACTIONS.UPDATE),
  FEES_MANAGE: permission('fees', PERMISSION_ACTIONS.MANAGE),
  CLASSES_VIEW: permission('classes', PERMISSION_ACTIONS.VIEW),
  CLASSES_MANAGE: permission('classes', PERMISSION_ACTIONS.MANAGE),
  SYLLABUS_VIEW: permission('syllabus', PERMISSION_ACTIONS.VIEW),
  SYLLABUS_MANAGE: permission('syllabus', PERMISSION_ACTIONS.MANAGE),
  ATTENDANCE_VIEW: permission('attendance', PERMISSION_ACTIONS.VIEW),
  ATTENDANCE_MARK: 'attendance.mark',
  EXAMS_VIEW: permission('exams', PERMISSION_ACTIONS.VIEW),
  EXAMS_ADD_NEW: permission('exams', PERMISSION_ACTIONS.ADD_NEW),
  EXAMS_UPDATE: permission('exams', PERMISSION_ACTIONS.UPDATE),
  EXAMS_MANAGE: permission('exams', PERMISSION_ACTIONS.MANAGE),
  RESULTS_VIEW: permission('results', PERMISSION_ACTIONS.VIEW),
  RESULTS_MANAGE: permission('results', PERMISSION_ACTIONS.MANAGE),
  SETTINGS_VIEW: permission('settings', PERMISSION_ACTIONS.VIEW),
  SETTINGS_MANAGE: permission('settings', PERMISSION_ACTIONS.MANAGE),
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
