import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import { Heading, Paragraph } from '@smallstep/step-ui';

import { DocContext } from '../context';
import ServerTemplate from '../templates/ServerTemplate';
import IngressTemplate from '../templates/IngressTemplate';

const useStyles = makeStyles((theme) => ({
  timestamp: {
    color: theme.palette.text.secondary,
  },
}));

const Page = ({ data, location }) => {
  const { docsYaml: doc, allMdx } = data;

  const classes = useStyles();

  const [provisioner, setProvisioner] = useState('jwk');
  const [deployment, setDeployment] = useState(
    doc.template === 'ingress' ? 'kubernetes' : 'linux'
  );

  useEffect(() => {
    const { provisioner: queryProvisioner, deployment: queryDeployment } =
      queryString.parse(location.search);

    const initialProvisioner = queryProvisioner || 'jwk';
    let initialDeployment;

    if (queryDeployment) {
      initialDeployment = queryDeployment;
    } else if (doc.template === 'ingress') {
      initialDeployment = 'kubernetes';
    } else if (initialProvisioner === 'acme' && doc.acme) {
      initialDeployment = 'builtin';
    } else {
      initialDeployment = 'linux';
    }

    setProvisioner(initialProvisioner);
    setDeployment(initialDeployment);
  }, [location.search, doc.template, doc.acme]);

  const handleProvisionerChange = ({ target: { value } }) => {
    let updatedDeployment =
      value === 'jwk' && deployment === 'builtin' ? 'linux' : deployment;

    if (value === 'acme' && provisioner === 'jwk') {
      updatedDeployment = 'builtin';
    }

    setProvisioner(value);
    setDeployment(updatedDeployment);
    window.history.pushState(
      {},
      '',
      `${location.pathname}?${queryString.stringify({
        provisioner: value,
        deployment: updatedDeployment,
      })}`
    );
  };

  const handleDeploymentChange = (event, value) => {
    setDeployment(value);
    window.history.pushState(
      {},
      '',
      `${location.pathname}?${queryString.stringify({
        provisioner,
        deployment: value,
      })}`
    );
  };

  const content = allMdx.edges.reduce(
    (obj, { node }) => ({
      ...obj,
      [node.slug]: node,
    }),
    {}
  );

  return (
    <>
      <GatsbySeo
        type="article"
        title={`${doc.name} TLS — How to get and renew ${doc.name} TLS certificates — Practical Zero Trust`}
        description={`Practical step-by-step instructions for implementing zero trust principles with ${doc.name}.`}
      />

      <DocContext.Provider
        value={{
          doc: {
            protocol: 'https',
            acme: false,
            ...doc,
            server: {
              name: 'myserver',
              dnsName: 'myserver.example.net',
              port: 443,
              ...doc.server,
            },
            linux: {
              systemdUnitName: doc.slug,
              ...doc.linux,
            },
            kubernetes: {
              ingressClass: 'nginx',
              ...doc.kubernetes,
            },
          },
          content,
          provisioner,
          deployment,
        }}
      >
        <Box mb={4}>
          <Heading variant="h1">
            {doc.name} TLS &mdash; Practical Zero Trust
          </Heading>
          <Heading component="h2" variant="h3">
            How to get and renew {doc.name} TLS certificates
          </Heading>
          <Paragraph variant="body2" className={classes.timestamp}>
            Written {doc.written}
            {doc.updated && `, last updated ${doc.updated}`}
          </Paragraph>
        </Box>

        {doc.template === 'server' && (
          <ServerTemplate
            doc={doc}
            content={content}
            provisioner={provisioner}
            deployment={deployment}
            onProvisionerChange={handleProvisionerChange}
            onDeploymentChange={handleDeploymentChange}
          />
        )}

        {doc.template === 'ingress' && (
          <IngressTemplate
            doc={doc}
            content={content}
            provisioner={provisioner}
            onProvisionerChange={handleProvisionerChange}
          />
        )}
      </DocContext.Provider>
    </>
  );
};

export const query = graphql`
  query ($id: String) {
    docsYaml(id: { eq: $id }) {
      slug
      name
      template
      written
      updated
      server {
        name
        dnsName
        port
      }
      linux {
        systemdUnitName
      }
      kubernetes {
        ingressClass
      }
      acme
    }
    allMdx {
      edges {
        node {
          slug
          body
        }
      }
    }
  }
`;

export default Page;
