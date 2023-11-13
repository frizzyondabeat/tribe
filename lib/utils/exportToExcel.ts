import xlsx, { IJsonSheet} from "json-as-xlsx";
import {UserSchema} from "@models/User";

export async function exportToExcel(data: any, fileName: string) {
    // const columns: IJsonSheet[] = [
    //     {
    //         sheet: "Sheet 1",
    //         columns: [
    //
    //         ],
    //         content: data
    //     }
    // ];
    //
    // const config = {
    //     fileName: fileName,
    //     extraLength: 3,
    //     writeOptions: {}
    // };
    //
    // xlsx(columns, config);

    const userKeysObject = {};
    for (const key in UserSchema.shape) {
        // @ts-ignore
        userKeysObject[key] = null;
    }

    console.log(userKeysObject);
}