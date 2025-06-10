---
slug: pep-723
version: v1.493.0
title: Python Inline Script Metadata [PEP-723]
tags: ['scripts', 'python']
description: Windmill now supports **PEP-723** inline script metadata, providing a standardized way to specify script dependencies and Python version requirements directly within your script. This implements the official Python packaging standard for inline script metadata. Besides, release brings refactor to Python runtime selection logic giving developer more precise control over Python version requirements than the simple annotations
features:
  - Specify dependencies with syntax from PEP-723
  - Use version specifiers to select Python version.
  - Select Python version with accuracy down to minor version. 
image: ./script.png
docs: /docs/advanced/dependencies_in_python#pep-723-inline-script-metadata
---
