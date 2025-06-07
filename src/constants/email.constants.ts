import { EmailEnum } from "../enums/email.enum";

type IEmailData = {
    subject: string;
    template: string;
};

type IEmailConstants<T extends Record<string, string>> = {
    [K in keyof T]: IEmailData;
};

export const emailConstants: IEmailConstants<typeof EmailEnum> = {
    [EmailEnum.THANKS]: { subject: "Thanks for join us", template: "thanks" },
    [EmailEnum.ACTIVATE]: { subject: "Activate Your Account", template: "activate" },
    [EmailEnum.RECOVERY]: { subject: "Recovery Password", template: "recovery" },
};

export type { IEmailConstants, IEmailData };
