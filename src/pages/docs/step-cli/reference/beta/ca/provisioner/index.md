---
layout: auto-doc
title: step beta ca provisioner
menu:
  docs:
    parent: step beta ca
    children:
      - add
      - remove
      - get
      - update
---

## Name
**step beta ca provisioner** -- create and manage the certificate authority provisioners

## Usage

```raw
step beta ca provisioner <subcommand> [arguments] [global-flags] [subcommand-flags]
```

## Description

**step beta ca provisioner** command group provides facilities for managing the
certificate authority provisioners.

WARNING: The 'beta' prefix is deprecated and will be removed in a future release.
Please use 'step ca provisioner ...' going forwards.

A provisioner is an entity that controls provisioning credentials, which are
used to generate provisioning tokens.

Provisioning credentials are simple JWK key pairs using public-key cryptography.
The public key is used to verify a provisioning token while the private key is
used to sign the provisioning token.

Provisioning tokens are JWT tokens signed by the JWK private key. These JWT
tokens are used to get a valid TLS certificate from the certificate authority.
Each provisioner is able to manage a different set of rules that can be used to
configure the bounds of the certificate.

In the certificate authority, a provisioner is configured with a JSON object
with the following properties:

* **name**: the provisioner name, it will become the JWT issuer and a good
  practice is to use an email address for this.
* **type**: the provisioner type, currently only "jwk" is supported.
* **key**: the JWK public key used to verify the provisioning tokens.
* **encryptedKey** (optional): the JWE compact serialization of the private key
  used to sign the provisioning tokens.
* **claims** (optional): an object with custom options for each provisioner.
  Options supported are:
  * **minTLSCertDuration**: minimum duration of a certificate, set to 5m by
    default.
  * **maxTLSCertDuration**: maximum duration of a certificate, set to 24h by
    default.
  * **defaultTLSCertDuration**: default duration of the certificate, set to 24h
    by default.
  * **disableRenewal**: whether or not to disable certificate renewal, set to false
    by default.
  * **allowRenewalAfterExpiry**: whether or not to allow certificate renewal of
    expired certificates, set to false by default.

## Examples

Add a single provisioner:
```shell
$ step beta ca provisioner add max@smallstep.com --type JWK --create
```

Remove a provisioner:
```shell
$ step beta ca provisioner remove max@smallstep.com
```

## Commands


| Name | Usage |
|---|---|
| **[add](add/)** | add a provisioner |
| **[remove](remove/)** | remove a provisioner from the CA configuration |
| **[get](get/)** | get a provisioner from the CA configuration |
| **[update](update/)** | update a provisioner |

