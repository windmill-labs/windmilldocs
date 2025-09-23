---
slug: dynamic-multiselect
version: v1.xxx.x
title: Dynamic multiselect
tags: ['Scripts', 'Flow editor']
description: Dynamic multiselect functionality allows creating multiselect fields with dynamic options that recompute based on other input values.
features:
  [
    'Create dynamic multiselect fields for both scripts and flows.',
    'Select multiple values from dynamically computed options.',
    'Options recompute automatically based on other input arguments.',
    'Support for TypeScript and Python implementations.',
    'Identical function implementation to dynamic select but returns array of values.',
  ]
docs: /docs/core_concepts/json_schema_and_parsing#dynamic-multiselect
---

Dynamic multiselect extends the existing dynamic select functionality by providing a multiselect component that allows users to choose multiple values from dynamically generated options.

## Key features

- **Multiple selection**: Unlike dynamic select which returns a single value, dynamic multiselect returns an array of selected values
- **Same implementation**: The helper functions are implemented identically to dynamic select - same function signature and return format
- **Context-aware options**: Options are recomputed based on other form inputs, providing intelligent filtering and categorization
- **Cross-language support**: Available in both TypeScript/JavaScript and Python scripts and flows

## Implementation

### In Scripts
Export both the array type as `DynMultiselect_<name>` and the function as `<name>`:

```typescript
export type DynMultiselect_categories = string[];

export async function categories(department: string) {
  if (department === 'engineering') {
    return [
      { value: 'frontend', label: 'Frontend' },
      { value: 'backend', label: 'Backend' },
      { value: 'devops', label: 'DevOps' }
    ];
  }
  return [{ value: 'general', label: 'General' }];
}

export async function main(categories: DynMultiselect_categories) {
  console.log(categories); // Array of selected values
  return categories;
}
```

### In Flows
For flow input fields, the function name must match the field name exactly:

```typescript
// For a flow input field named "tags"
async function tags(department: string) {
  return [
    { value: 'urgent', label: 'Urgent' },
    { value: 'review', label: 'Review' },
    { value: 'feature', label: 'Feature' }
  ];
}
```

The multiselect field will automatically filter out any selected values that are no longer available when options change, ensuring data consistency.