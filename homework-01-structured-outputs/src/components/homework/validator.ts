// 本地教学演示：只校验下列固定 Schema，不是通用 JSON Schema 引擎。
export const schema = {
	type: "object",
	properties: {
		topic: { type: "string" },
		minutes: { type: "integer" },
		verified: { type: "boolean" },
	},
	required: ["topic", "minutes", "verified"],
	additionalProperties: false,
} as const;

export type ValidationResult = {
	parseOk: boolean;
	schemaOk: boolean | null;
	errors: string[];
	parseMessage: string;
};

export type TeachingSample = {
	id: string;
	label: string;
	json: string;
	expectedParse: boolean;
	expectedSchema: boolean | null;
};

// 人工编写的本地教学样例，不是模型生成结果或 API 实测。
export const samples: TeachingSample[] = [
	{
		id: "valid",
		label: "本地教学 · 合法对象",
		json: '{\n  "topic": "Structured Outputs",\n  "minutes": 20,\n  "verified": false\n}',
		expectedParse: true,
		expectedSchema: true,
	},
	{
		id: "syntax",
		label: "本地教学 · JSON 语法错误",
		json: '{\n  "topic": "Structured Outputs",\n  "minutes": 20,\n  "verified": false,\n}',
		expectedParse: false,
		expectedSchema: null,
	},
	{
		id: "missing",
		label: "本地教学 · 缺少必填字段",
		json: '{\n  "topic": "Structured Outputs",\n  "minutes": 20\n}',
		expectedParse: true,
		expectedSchema: false,
	},
	{
		id: "type",
		label: "本地教学 · 字段类型错误",
		json: '{\n  "topic": "Structured Outputs",\n  "minutes": "20",\n  "verified": false\n}',
		expectedParse: true,
		expectedSchema: false,
	},
	{
		id: "extra",
		label: "本地教学 · 额外字段",
		json: '{\n  "topic": "Structured Outputs",\n  "minutes": 20,\n  "verified": false,\n  "note": "不允许的字段"\n}',
		expectedParse: true,
		expectedSchema: false,
	},
	{
		id: "untrue",
		label: "本地教学 · 结构合规但观点错误",
		json: '{\n  "topic": "Schema 合规意味着事实一定正确",\n  "minutes": 20,\n  "verified": true\n}',
		expectedParse: true,
		expectedSchema: true,
	},
];

export function validateJSON(text: string): ValidationResult {
	let value: unknown;
	try {
		value = JSON.parse(text);
	} catch (error) {
		return {
			parseOk: false,
			schemaOk: null,
			errors: [],
			parseMessage: `JSON 语法解析失败：${error instanceof Error ? error.message : "无效 JSON"}`,
		};
	}
	const errors: string[] = [];
	if (value === null || typeof value !== "object" || Array.isArray(value)) {
		errors.push("根值必须是对象，不能是 null、数组或基本类型。");
	} else {
		const object = value as Record<string, unknown>;
		for (const key of Object.keys(object)) {
			if (!Object.prototype.hasOwnProperty.call(schema.properties, key)) {
				errors.push(`不允许额外字段：${key}。`);
			}
		}
		for (const key of schema.required) {
			if (!Object.prototype.hasOwnProperty.call(value, key)) {
				errors.push(`缺少必填字段：${key}。`);
				continue;
			}
			const field = object[key];
			const type = schema.properties[key].type;
			const valid = type === "integer"
				? typeof field === "number" && Number.isFinite(field) && Number.isInteger(field)
				: typeof field === type;
			if (!valid) {
				errors.push(`字段 ${key} 必须是 ${type}${type === "integer" ? "（有限整数）" : ""}。`);
			}
		}
	}
	return {
		parseOk: true,
		schemaOk: errors.length === 0,
		errors,
		parseMessage: "JSON 语法解析成功。",
	};
}
