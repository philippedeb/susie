import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import "../../../css/GuidePage.css";
import "../../../css/Link.css";
import Section from "../../structure/Section";

function TypesOfSustainabilityGuide() {
  return (
    <Container className="guide-page-container">
      <Row>
        <Col>
          <h3>The Different Types of Sustainability in Software Development</h3>
          <p>
            When we talk about sustainability, we usually think about
            environmental sustainability - and for good reason! But did you know
            there are actually four more forms of sustainability that are just
            as important? Let's dive into the five different types of
            sustainability:
          </p>
          <Section title="Environmental Sustainability 🌍">
            <p>
              In software development, environmental sustainability is all about
              reducing the carbon footprint of our digital systems. This can
              include optimizing code to reduce energy consumption, using
              renewable energy to power data centers, and designing systems that
              can scale sustainably. By practicing environmental sustainability
              in software development, we can help ensure a healthy planet for
              generations to come.
            </p>
          </Section>
          <Section title="Social Sustainability 🌆">
            <p>
              Social sustainability in software development focuses on creating
              systems that are accessible and inclusive for all users. This
              includes promoting diversity and inclusion in the tech industry,
              designing user interfaces that are easy to use for people with
              different abilities, and ensuring that digital services are
              available to people regardless of their socio-economic status.
              Social sustainability also involves creating safe and healthy
              online communities where people can thrive.
            </p>
          </Section>
          <Section title="Individual Sustainability 🪷">
            <p>
              Individual sustainability in software development is all about
              taking care of the people who create and maintain our digital
              systems. It's about promoting work-life balance, managing stress,
              and prioritizing mental and physical health. This can involve
              practices like mindfulness, meditation, and exercise. By focusing
              on individual sustainability, we can create a more resilient and
              productive workforce that is better equipped to tackle the
              challenges of sustainable software development.
            </p>
          </Section>
          <Section title="Economic Sustainability 💰">
            <p>
              Economic sustainability in software development is about creating
              business models that are financially viable in the long term,
              while also considering the impact on society and the environment.
              This can involve implementing sustainable procurement practices,
              promoting fair labor standards in the tech industry, and ensuring
              that digital systems are designed to support local economies. By
              practicing economic sustainability, we can create a more equitable
              and sustainable tech industry that benefits everyone.
            </p>
          </Section>
          <Section title="Technical Sustainability 🛠️">
            <p>
              Technical sustainability in software development is all about
              maintaining the digital infrastructure and systems that support
              our daily lives. This can include everything from optimizing code
              for performance and reliability to designing systems that can
              adapt to changing needs over time. By practicing technical
              sustainability, we can ensure that our digital systems are
              reliable, efficient, and resilient, while also reducing the
              environmental impact of our digital footprint.
            </p>
          </Section>

          <p>
            By understanding and practicing all five types of sustainability in
            the context of software development, we can create a more resilient,
            equitable, and sustainable tech industry for everyone.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default TypesOfSustainabilityGuide;
