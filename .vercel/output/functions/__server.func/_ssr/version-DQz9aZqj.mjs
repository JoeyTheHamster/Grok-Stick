import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/version-DQz9aZqj.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var FALLBACK = "1.0.13";
var getCliVersion_createServerFn_handler = createServerRpc({
	id: "baab326d137db5e8586a9a1ae18c095b1192cd4aba8cf1ea321735246a8201c9",
	name: "getCliVersion",
	filename: "src/lib/kit/version.ts"
}, (opts) => getCliVersion.__executeServer(opts));
var getCliVersion = createServerFn({ method: "GET" }).handler(getCliVersion_createServerFn_handler, async () => {
	for (const url of ["https://x.ai/cli/stable", "https://storage.googleapis.com/grok-build-public-artifacts/cli/stable"]) try {
		const res = await fetch(url, { cache: "no-store" });
		if (!res.ok) continue;
		const version = (await res.text()).trim().split(/\s+/)[0] ?? "";
		if (/^\d+\.\d+\.\d+/.test(version)) return { version };
	} catch {}
	return { version: FALLBACK };
});
//#endregion
export { getCliVersion_createServerFn_handler };
