interface generateOptions {
    length?: number;
    separator?: string;
    numbers?: boolean;
    uppercase?: boolean;
    titlecase?: boolean;
    pattern?: string;
}
export declare function generate(options?: generateOptions): string;
export declare function generateMultiple(amount: number, options?: generateOptions): Array<string>;
export {};
