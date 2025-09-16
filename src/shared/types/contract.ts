import type { ZodType } from 'zod';

type ContractUrlPropFn = (...props: any[]) => string
export interface IContract {
    url: string | ContractUrlPropFn;
    
    endpointDetails: {
        CONTROLLER_URL: string;
        REQUEST_METHOD: string;
        METHOD_DESCRIPTION: string;
        METHOD_LONG_DESCRIPTION: string;
    }
    RequestSchema: ZodType<any>;
    ResponseSchema: ZodType<any>;
    Request: any;
    Response: any;
}