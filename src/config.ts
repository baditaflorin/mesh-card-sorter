import { createMeshConfig } from "@baditaflorin/mesh-common";

export const config = createMeshConfig({
  appName: "Mesh Card Sorter",
  breadcrumbs: false,
  description: "A shared flip-card board for sorting ideas together.",
  accentHex: "#8558d6",
  version: __APP_VERSION__,
  commit: __GIT_COMMIT__,
});
