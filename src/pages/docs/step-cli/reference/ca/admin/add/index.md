---
layout: auto-doc
title: step ca admin add
menu:
  docs:
    parent: step ca admin
---

## Name
**step ca admin add** -- add an admin to the CA configuration

## Usage

```raw
step ca admin add <subject> <provisioner> [--super]
[--admin-cert=<file>] [--admin-key=<file>] [--admin-provisioner=<name>]
[--admin-subject=<subject>] [--password-file=<file>] [--ca-url=<uri>]
[--root=<file>] [--context=<name>]
```

## Description

**step ca admin add** adds an admin to the CA configuration.

## Positional arguments

`subject`
The subject name that must appear in the identifying credential of the admin.

`provisioner`
The name of the provisioner

## Options


**--super**
Give administrator SuperAdmin privileges.

**--admin-cert**=`chain`
Admin certificate (`chain`) in PEM format to store in the 'x5c' header of a JWT.

**--admin-key**=`file`
Private key `file`, used to sign a JWT, corresponding to the admin certificate that will
be stored in the 'x5c' header.

**--admin-provisioner**=`name`, **--admin-issuer**=`name`
The provisioner `name` to use for generating admin credentials.

**--admin-subject**=`subject`, **--admin-name**=`subject`
The admin `subject` to use for generating admin credentials.

**--password-file**=`file`
The path to the `file` containing the password to encrypt or decrypt the private key.

**--ca-url**=`URI`
`URI` of the targeted Step Certificate Authority.

**--root**=`file`
The path to the PEM `file` used as the root certificate authority.

**--context**=`name`
The context `name` to apply for the given command.

## Examples

Add regular Admin:
```shell
$ step ca admin add max@smallstep.com google
```

Add SuperAdmin:
```shell
$ step ca admin add max@smallstep.com google --super
```


