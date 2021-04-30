type ActiveChatters = {
  id: "ActiveChatters",
  name: "Active Chat User"
};

type FirebotRole =
  | ActiveChatters;

export type FirebotRolesManager = {
  userIsInFirebotRole: (role: FirebotRole, username: string) => boolean;
  getAllFirebotRolesForViewer: (username: string) => FirebotRole[];
}
