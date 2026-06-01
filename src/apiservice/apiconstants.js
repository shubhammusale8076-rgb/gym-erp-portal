export const API_URLs = {
   LOGIN:"/auth/login",
   GET_ALL_USERS:"/user/get-user-list",
   GET_ALL_ROLES:"/auth/get-roles",
   CREATE_ROLE: "/auth/addrole",
   UPDATE_ROLE: "/auth/update-role",

   PAYMENT_ACCESS:(token)=>`/payments/access/${token}`,

   SEARCH_USER:(fullName)=>`/members/search?query=${fullName}`,
   ASSIGN_ROLE:"/members/assign-role",

   GET_ALL_MEMBERS:"/members/by-tenant",
   ADD_MEMBER:"/members/create-member",
   UPDATE_MEMBER:(id)=>`/members/update-member/${id}`,
   GET_MEMBER_BY_ID:(id)=>`/members/get-member/${id}`,
   UPLOAD_MEMBER_PROFILE:"/upload/profile",
   DELETE_MEMBER:(id)=>`/members/delete-member/${id}`,
   RESET_PASSWORD:(memberId)=>`/auth/reset-password/${memberId}`,
 
   GET_MEMBERS:"/assignment/get-members",
   GET_TRAINERS:"/assignment/get-trainers",
   ADD_TRAINER:"/trainers/create-trainer",
   DELETE_TRAINER:(id)=>`/trainers/delete-trainer/${id}`,
   UPDATE_TRAINER:(id)=>`/trainers/update-trainer/${id}`,
   GET_TRAINER_DATA:(id)=>`/assignment/trainer/${id}`,
   ASSIGN_TRAINER:"/assignment/assign-trainer",
   UNASSIGN_TRAINER:(trainerId,memberId)=>`/assignment/remove-trainer/${trainerId}?memberId=${memberId}`,
   GET_PLAN_COMPARISON:"/membership-plans/comparison",

   GET_ALL_PLAN:"/membership-plans/get-plans/by-tenant",
   GET_PLAN_LIST:"/membership-plans/get-plans-list/by-tenant",
   CREATE_PLAN:"/membership-plans/create-plan",
   UPDATE_PLAN:"/membership-plans/update-plan",
   DELETE_PLAN:(id)=>`/membership-plans/delete-plan/${id}`,

   GET_MEMBERSHIP_LIST:"/subscriptions/memberships",
   GET_MEMBERSHIP_BY_MEMBER_ID:(id)=>`/subscriptions/member/${id}`,

   GET_PLAN_INSIGHT:"/subscriptions/get-insight",

   GET_ALL_TRAINERS:"/trainers/get-all",
   GET_TRAINER_BY_ID:(id)=>`/trainers/get-trainer/${id}`,

   GET_INTEGRATION:"/integrations",
   VALIDATE_INTEGRATION:"/integrations/validate",
   CONNECT_INTEGRATION:"/integrations/connect",
   DISCONNECT_INTEGRATION:(integrationType)=>`/integrations/disconnect?type=${integrationType}`,
   GOOGLE_CONNECT:"/integrations/google/connect",
   GET_INTEGRATION_BY_SERVICE:(service)=>`/integrations/service/${service}`,

   // Google

   EXPORT_MEMBERS_TO_GOOGLE_SHEETS:"/integrations/google/export-members",


   //Whatsapp

   SEND_WELCOME_MSG:(memberId)=>`/integrations/whatsapp/send-welcome-msg/${memberId}`,





   // 🚀 CRM & Lead Management Endpoints
   CRM_DASHBOARD: "/crm/dashboard",
   CRM_CONVERSION_RATE: "/crm/conversion-rate",
   CRM_SOURCE_PERFORMANCE: "/crm/source-performance",
   CRM_REVENUE_PIPELINE: "/crm/revenue-pipeline",

   GET_ALL_LEADS: "/leads",
   CREATE_LEAD: "/leads",
   UPDATE_LEAD: (id) => `/leads/${id}`,
   GET_LEAD_BY_ID: (id) => `/leads/${id}`,
   DELETE_LEAD: (id) => `/leads/${id}`,
   UPDATE_LEAD_STAGE: (id) => `/leads/${id}/stage`,
   CONVERT_LEAD: (id) => `/leads/${id}/convert`,
   GET_LEAD_KANBAN: "/leads/kanban",

   GET_LEAD_ACTIVITIES: (id) => `/leads/${id}/activities`,
   GET_LEAD_NOTES: (id) => `/leads/${id}/notes`,
   ADD_LEAD_NOTE: (id) => `/leads/${id}/notes`,
   GET_LEAD_TASKS: (id) => `/leads/${id}/tasks`,
   ADD_LEAD_TASK: (id) => `/leads/${id}/tasks`,
   COMPLETE_LEAD_TASK: (id) => `/tasks/${id}/complete`,

   SCHEDULE_FOLLOW_UP: "/followups",
   GET_TODAY_FOLLOW_UPS: "/followups/today",
   GET_OVERDUE_FOLLOW_UPS: "/followups/overdue",
   COMPLETE_FOLLOW_UP: (id) => `/followups/${id}/complete`,

};


export const API_BASE_URL = "http://localhost:8081/api"