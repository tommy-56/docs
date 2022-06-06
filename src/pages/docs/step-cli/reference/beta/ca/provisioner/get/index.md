---
layout: auto-doc
title: step beta ca provisioner get
menu:
  docs:
    parent: step beta ca provisioner
---

## Name
**step beta ca provisioner get** -- get a provisioner from the CA configuration

## Usage

```raw
step beta ca provisioner get <name>
[--admin-cert=<file>] [--admin-key=<file>] [--admin-provisioner=<name>]
[--admin-subject=<subject>] [--password-file=<file>] [--ca-url=<uri>]
[--root=<file>] [--context=<name>]
```

## Description

**step beta ca provisioner get** gets a provisioner from the CA configuration.

WARNING: The 'beta' prefix is deprecated and will be removed in a future release.
Please use 'step ca admin ...' going forwards.

## Options


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

Get a provisioner by name:
```shell
$ step beta ca provisioner get acme
```

