interface IQueryParams {
    pageSize: number;
    page: number;
    search?: string;
    clinicId?: string;
    doctorId?: string;
    specialtyId?: string;
    order?: string;
}

export type { IQueryParams };
