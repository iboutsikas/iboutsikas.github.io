---
title: 'Blueprint'
date: 2026-02-10
categories: ['engineering', 'tooling']
description: 'An extensible code generation tool that automates the creation of boilerplate code from function signatures using customizable templates.'
lead: 'Automate your competitive programming workflow by generating complete source files directly from function signatures.'
links:
  - title: Repository
    url: https://github.com/iboutsikas/blueprint
---

## Overview

We all had to do LeetCode in one way or another. But when you are trying to
learn, the various sites are at best lacking; they offer no debugging
capability, especially when there is a non-obvious error.

I made Blueprint so I can quickly copy-paste a function signature and be able to
run tests locally, fast. It is a powerful, extensible code generation tool
designed to automate the creation of boilerplate code.

Instead of spending several minutes manually scaffolding test classes, setting
up namespaces, and configuring test data, Blueprint reduces that friction to
seconds. It's about removing the tedious parts of competitive programming so
I can focus entirely on the logic.

By providing a function signature and a custom template, Blueprint parses the
signature and generates complete source files tailored to your specific
environment—whether that's a C# project with xUnit, a C++ project using CMake,
or any other combination.

{{< video src="function-signature.webm"  caption="Blueprint in action"/ >}}

Most LeetCode style sites will give a collection of things as `[thing1, thing2,
thing3]`. In my C# templates I use xUnit, as it's TheoryData allows me to copy
paste the test cases as you can see below.

```csharp
//                                 👇 First Parameter
//                                 👇        👇 Return type
public class TestData: TheoryData<List<int>, int>
{
    public TestData()
    {
      // Tests from https://leetcode.com/problems/two-sum/description/
      Add([2,7,11,15], 9)
      Add([3,2,4], 6)
      Add([3,3], 6)
    }
}
```

The full template can be found in the [examples](https://github.com/iboutsikas/blueprint/tree/main/examples/csharp)

## Key Features

- **Signature Parsing**: Automatically extracts return types, function names,
  and arguments from function signatures.
- **Customizable Templates**: Uses the
  [Scriban](https://github.com/scriban/scriban) templating engine, allowing you
  to define exactly how your boilerplate should look.
- **Environment Agnostic**: Since you provide the template, you can generate
  code for any testing framework (xUnit, NUnit, GoogleTest) or build system
  (CMake, Make, Visual Studio).
- **Multi-Language Support**:
  - **C#**: Leverages Roslyn for precise parsing.
  - **C++**: Uses ANTLR4 for robust grammar-based parsing.
- **Desktop GUI**: A modern, cross-platform interface built with [Avalonia
  UI](https://avaloniaui.net/).

## Technical Stack

The application is built using a modern, high-performance stack:

- **Runtime**: .NET 10
- **UI Framework**: Avalonia UI (MVVM)
- **Templating Engine**: Scriban
- **Parsing**: Microsoft.CodeAnalysis (Roslyn) for C# and ANTLR4 for C++

## How It Works

The generation process follows a simple three-step workflow:

1. **Define a Template**: Create a template file using Scriban syntax to define
   your desired structure.
2. **Input a Signature**: Provide a string like `int add(int a, int b)` or
   `vector<int> twoSum(vector<int>& nums, int target)`.
3. **Generate**: Blueprint parses the signature, injects the metadata into your
   template, and outputs a ready-to-use source file.

## Quick Start

To try it out locally:

1. Clone the repository.
2. Navigate to the project directory.
3. Run `dotnet run --project Blueprint/Blueprint.csproj`.
