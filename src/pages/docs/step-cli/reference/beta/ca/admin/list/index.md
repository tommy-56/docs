---
layout: auto-doc
title: step beta ca admin list
menu:
  docs:
    parent: step beta ca admin
---

## Name
**step beta ca admin list** -- list all admins in the CA configuration

## Usage

```raw
step beta ca admin list [--super] [--provisioner=<name>]
[--admin-cert=<file>] [--admin-key=<file>] [--admin-provisioner=<name>]
[--admin-subject=<subject>] [--password-file=<file>] [--ca-url=<uri>]
[--root=<file>] [--context=<name>]
```

## Description

**step beta ca admin list** lists all admins in the CA configuration.

WARNING: The 'beta' prefix is deprecated and will be removed in a future release.
Please use 'step ca admin ...' going forwards.

## Options


**--super**
Only return super-admins.

**--provisioner**=`name`
The provisioner `name` by which to filter admins.

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

List all admins:
```shell
$ step beta ca admin list
```

List only super-admins:
```shell
$ step beta ca admin list --super
```

List only admins without super-admin privileges:
```shell
$ step beta ca admin list --super=false
```

List all admins associated with a given provisioner:
```shell
$ step beta ca admin list --provisioner admin-jwk
```

List only super-admins associated with a given provisioner:
```shell
$ step beta ca admin list --super --provisioner admin-jwk
```


