import assert from "node:assert/strict";
import test from "node:test";

import * as validator from "../src/components/homework/validator.ts";

test("exports the exact fixed teaching schema", () => {
	assert.deepEqual(validator.schema, {
		type: "object",
		properties: {
			topic: { type: "string" },
			minutes: { type: "integer" },
			verified: { type: "boolean" },
		},
		required: ["topic", "minutes", "verified"],
		additionalProperties: false,
	});
});

test("accepts a valid object including zero and false", () => {
	assert.equal(typeof validator.validateJSON, "function");
	const result = validator.validateJSON('{"topic":"","minutes":0,"verified":false}');
	assert.equal(result.parseOk, true);
	assert.equal(result.schemaOk, true);
	assert.deepEqual(result.errors, []);
	assert.equal(typeof result.parseMessage, "string");
	assert.ok(result.parseMessage.length > 0);
});

test("requires every field as an own property", () => {
	for (const field of ["topic", "minutes", "verified"]) {
		const value = { topic: "x", minutes: 1, verified: true };
		delete value[field];
		assertSchemaFailure(JSON.stringify(value), field);
	}
	assert.equal(validator.validateJSON("{}").errors.length, 3);
	Object.defineProperty(Object.prototype, "topic", { value: "inherited", configurable: true });
	try {
		assertSchemaFailure('{"minutes":1,"verified":true}', "topic");
	} finally {
		delete Object.prototype.topic;
	}
});

test("enforces field types without coercion, rejecting fractions and infinity", () => {
	const wrongValues = {
		topic: [null, 1, true, [], {}],
		minutes: [null, "0", false, [], {}, 1.5],
		verified: [null, "false", 0, [], {}],
	};
	for (const [field, values] of Object.entries(wrongValues)) {
		for (const value of values) {
			assertSchemaFailure(JSON.stringify({ topic: "x", minutes: 1, verified: true, [field]: value }), field);
		}
	}
	for (const number of ["1e400", "-1e400"]) {
		assertSchemaFailure(`{"topic":"x","minutes":${number},"verified":true}`, "minutes");
	}
	for (const number of ["-1", "1.0", "1e2"]) {
		assert.equal(validator.validateJSON(`{"topic":"x","minutes":${number},"verified":true}`).schemaOk, true);
	}
});

test("rejects extra own keys including prototype-related names", () => {
	for (const key of ["extra", "__proto__", "constructor", "toString", "hasOwnProperty"]) {
		assertSchemaFailure(`{"topic":"x","minutes":1,"verified":true,"${key}":{}}`, key);
	}
	const result = validator.validateJSON('{"topic":1,"minutes":"2","extra":true}');
	assert.equal(result.errors.length, 4);
});

test("exports six local teaching samples with verified expectations", () => {
	assert.ok(Array.isArray(validator.samples));
	assert.deepEqual(validator.samples.map((sample) => sample.id), ["valid", "syntax", "missing", "type", "extra", "untrue"]);
	const expected = [[true, true], [false, null], [true, false], [true, false], [true, false], [true, true]];
	for (const [index, sample] of validator.samples.entries()) {
		assert.equal(typeof sample.json, "string");
		assert.match(sample.label, /本地教学/);
		assert.deepEqual([sample.expectedParse, sample.expectedSchema], expected[index]);
		const result = validator.validateJSON(sample.json);
		assert.deepEqual([result.parseOk, result.schemaOk], expected[index], sample.id);
	}
	assert.equal(JSON.parse(validator.samples[5].json).topic, "Schema 合规意味着事实一定正确");
});

function assertSchemaFailure(text, field) {
	const result = validator.validateJSON(text);
	assert.equal(result.parseOk, true, text);
	assert.equal(result.schemaOk, false, text);
	assert.ok(result.errors.length > 0, text);
	assert.ok(result.errors.every((error) => typeof error === "string"));
	if (field) assert.ok(result.errors.some((error) => error.includes(field)), field);
}

test("rejects non-object roots including null and arrays", () => {
	for (const text of ["null", "[]", '["x",0,false]', '"text"', "0", "true", "false"]) {
		assertSchemaFailure(text);
	}
});

test("syntax failures do not attempt schema validation or execute code", () => {
	for (const text of ["", '{"topic":}', '{"topic":"x",}', '(()=>{throw new Error("executed")})()', "NaN", "Infinity"]) {
		const result = validator.validateJSON(text);
		assert.equal(result.parseOk, false, text);
		assert.equal(result.schemaOk, null, text);
		assert.deepEqual(result.errors, []);
		assert.match(result.parseMessage, /JSON/);
	}
});
