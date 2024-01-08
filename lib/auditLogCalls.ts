import {z} from "zod";
import {AxiosInstance} from "axios";
import {AuditLogProps, AuditLogSchema} from "@models/AuditLog";

export const AuditLogResults = z.array(AuditLogSchema)

export type AuditLogArray = z.infer<typeof AuditLogResults>

export const VIEW_ALL_AUDIT_LOGS_URL = "/api/v1/admin/audit/get-logs";

export async function fetchAllAuditLogs(axiosAuth: AxiosInstance) {
    const data = {};
    try {
        const res = await axiosAuth.post(VIEW_ALL_AUDIT_LOGS_URL, data);
        console.log(res.data);

        if (!res.data) {
            return undefined;
        }

        const auditLogsJson: AuditLogArray = res.data?.data;
        return AuditLogResults.parse(auditLogsJson);
    } catch (err) {
        console.log(err);
        throw err;
    }
}