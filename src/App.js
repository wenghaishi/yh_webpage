import React, { useState } from 'react';
import './App.css';
import cx from 'classnames'
import content from './content'

function App() {
  const home = "Home";
  const projects = "View Projects";
  const contact = "Contact";
  /**
   * ==================================================
   *        Experience
   * ==================================================
   */
  const checkClasses = (description) => {
    let css = ""
    const classes = ["\\weight-3\\", "\\size-1\\"]
    classes.forEach((clas) => {
      if (description.includes(clas)) {
        css += clas.replaceAll("\\", "") + " "
        description = description.replace(clas, "")
      }
    });
    console.log(css, description)
    return { css, text: description }
  }
  const generateDescription = (descriptions, isPadding=false) => {
    return descriptions.split("\n").map((description) => {
      const { css, text } = checkClasses(description)
      return (
        <div className={cx("text-left mx-auto", css, {
          "px-3": description.includes("•") || isPadding
        })}>{text}&nbsp;</div>
      )
    });
  }
  const generateExperience = (experience, isPadding=false) => {
    return experience.map((experience) => (
      <div className="font-weight-light">
        <div className="font-weight-bold size-1">{experience.title}</div>
        {
          experience.positions.map((position) => (
            <div>
              <div className="d-md-flex justify-content-between">
                <div className="blue-sea font-weight-bold">{position.name}</div>
                <div className="font-weight-bold">{position.date}</div>
              </div>
              { generateDescription(position.description, isPadding) }
            </div>
          ))
        }
      </div>
    ))
  }
  /**
   * ==================================================
   *        Footer
   * ==================================================
   */
  const footerWrapper = (setPage, page=home, pageValue) => {
    if (page != pageValue) return (
      <div
        className=""
        onClick={() => setPage(pageValue)}
        role="button"
      >
        {pageValue}
      </div>
    )
  }
  const generateFooter = (setPage, page=home) => {
    return (
      <div className="footer d-flex justify-content-around">
        { footerWrapper(setPage, page, home) }
        { footerWrapper(setPage, page, projects) }
        { footerWrapper(setPage, page, contact) }

      </div>
    )
  }
  /**
   * ==================================================
   *        Link Component
   * ==================================================
   */
  const generateBadge = (badge) => {
    if (badge == null) return
    const [lang, details] = badge.text.split(":")
    if (lang == null) lang = ""
    if (details == null) details = ""
    return (
      <div className="position-bottom overflow-hidden">
        <span className={cx("dot", badge.class)} />
        <span className="pl-1 weight-3">{`${lang}`}</span>
        <span className="d-none d-md-inline">{`: ${details}`}</span>
      </div>
    )
  }
  const generateLinkComponent = (components) => {
    return components.map((component) => (
      <div
        className={cx(component.class, "linkComponent")}
        onClick={() => window.open(component.link) }
        role="button"
      >
        <div className="size-1 weight-4 blue-sea">{component.name}</div>
        <div>{component.description}</div>
        {generateBadge(component.badge)}
      </div>
    ));
  }
  /**
   * ==================================================
   *        PAGES
   * ==================================================
   */
  const generatePages = (page, setPage) => {
    switch (page) {
      /**
       * ==================================================
       *        Page: Projects
       * ==================================================
       */
      case projects:
        return (
          <div class="container">
            <div className="blue-dark size-3 text-left py-3">Development Projects</div>
            <div class="row">
              { generateLinkComponent(content.dev_projects) }
            </div>
            <div className="blue-dark size-3 text-left py-3">Data Science Projects</div>
            <div class="row">
              { generateLinkComponent(content.data_projects) }
            </div>
            <div className="blue-dark size-3 text-left py-3">Algorithmic Projects</div>
            <div class="row">
              { generateLinkComponent(content.algo_projects) }
            </div>
            <div className="blue-dark size-3 text-left py-3">Professional Websites</div>
            <div class="row">
              { generateLinkComponent(content.professional_websites) }
            </div>
            {/* footer */}
            { generateFooter(setPage, projects) }
          </div>
        )
      /**
       * ==================================================
       *        Page: Contact
       * ==================================================
       */
      case contact:
        return (
          <div class="container">
            <div className="blue-dark size-3 text-left py-3">Contact</div>
            <div class="row">
              { generateLinkComponent(content.contact) }
            </div>
            {/* footer */}
            { generateFooter(setPage, contact) }
          </div>
        )
      /**
       * ==================================================
       *        Page: Root
       * ==================================================
       */
      default:
        return (
          <div>
            {/* description */}
            { generateDescription(content.description) }
            <br/>
            {/* footer */}
            { generateFooter(setPage) }
            {/* education */}
            <div className="blue-dark size-2 text-left">Education</div>
            <div className="text-left mx-auto">
              { generateExperience(content.education, false) }
            </div><br/>
            {/* professional experiences */}
            <div className="blue-dark size-2 text-left">Professional Experiences</div>
            <div className="text-left mx-auto">
              { generateExperience(content.professionalExperiences) }
            </div><br/>
            {/* leadership experiences */}
            <div className="blue-dark size-2 text-left">Leadership Experiences</div>
            <div className="text-left mx-auto">
              { generateExperience(content.leadershipExperiences) }
            </div><br/>
            {/* footer */}
            { generateFooter(setPage) }
          </div>
        )
    }
  }
  /**
   * ==================================================
   *        Main Function
   * ==================================================
   */
  const [page, setPage] = useState(home)
  return (
    <div className="App container">
      {/* header */}
      <div
        className="sticky-top bg-white d-md-flex justify-content-between py-3"
      >
        {/* header name */}
        <div
          className="text-left size-4"
          onClick={() => setPage(home)}
          role="button"
        >
          <span className="blue-sea">Yu</span>
          <span className="">Heng</span>
        </div>
        {/* header links */}
        <div className="d-flex text-decoration-underline">
          <div
            className="size-1 align-self-end pr-3 font-weight-bold"
            onClick={() => setPage(projects)}
            role="button"
          >
            Projects
          </div>
          <div
            className="size-1 align-self-end pl-3 font-weight-bold"
            onClick={() => setPage(contact)}
            role="button"
          >
            Contact
          </div>
        </div>
      </div>
      {/* pages */}
      <div className="size-n1">
        { generatePages(page, setPage) }
      </div>
    </div>
  );
}

export default App;
