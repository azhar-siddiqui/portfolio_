import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link, Image } from '@react-pdf/renderer';
import { DATA } from '@/data/resume';

// Define styles for light and dark themes
const createStyles = (theme: 'light' | 'dark') => StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#000000',
  },
  header: {
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: theme === 'dark' ? '#ffffff' : '#000000',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contact: {
    fontSize: 12,
    marginBottom: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    borderBottom: 1,
    borderBottomColor: theme === 'dark' ? '#ffffff' : '#000000',
    paddingBottom: 5,
  },
  text: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 5,
  },
  workItem: {
    marginBottom: 15,
  },
  workTitle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  workCompany: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  workPeriod: {
    fontSize: 10,
    color: theme === 'dark' ? '#cccccc' : '#666666',
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    fontSize: 10,
    backgroundColor: theme === 'dark' ? '#333333' : '#f0f0f0',
    padding: '2 6',
    margin: '2 4 2 0',
    borderRadius: 3,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  link: {
    color: theme === 'dark' ? '#4a9eff' : '#0066cc',
    textDecoration: 'underline',
  },
});

interface ResumeProps {
  theme: 'light' | 'dark';
  height?: number;
}

const Resume: React.FC<ResumeProps> = ({ theme, height = 2500 }) => {
  const styles = createStyles(theme);

  return (
    <Document>
      <Page size={[595, height]} style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{DATA.name}</Text>
              <Text style={styles.contact}>{DATA.location} | {DATA.contact.email} | {DATA.contact.tel}</Text>
            </View>
            {DATA.avatarUrl && (
              <Image src={DATA.avatarUrl} style={{ width: 60, height: 60, borderRadius: 30 }} />
            )}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Link src={DATA.url} style={[styles.text, styles.link, { marginRight: 10 }]}>
              Portfolio
            </Link>
            {Object.entries(DATA.contact.social).map(([key, social]) => (
              <Link key={key} src={social.url} style={[styles.text, styles.link, { marginRight: 10 }]}>
                {social.name}
              </Link>
            ))}
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.text}>{DATA.summary}</Text>
        </View>

        {/* Work Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {DATA.work.map((work, index) => (
            <View key={index} style={styles.workItem}>
              <Text style={styles.workTitle}>{work.title}</Text>
              {work.href ? (
                <Link src={work.href} style={[styles.workCompany, styles.link]}>
                  {work.company} →
                </Link>
              ) : (
                <Text style={styles.workCompany}>{work.company}</Text>
              )}
              <Text style={styles.workPeriod}>{work.start} - {work.end || 'Present'}</Text>
              <Text style={styles.text}>{work.description}</Text>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {DATA.education.map((edu, index) => (
            <View key={index} style={styles.workItem}>
              <Text style={styles.workTitle}>{edu.degree}</Text>
              {edu.href ? (
                <Link src={edu.href} style={[styles.workCompany, styles.link]}>
                  {edu.school} →
                </Link>
              ) : (
                <Text style={styles.workCompany}>{edu.school}</Text>
              )}
              <Text style={styles.workPeriod}>{edu.start} - {edu.end}</Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skills}>
            {DATA.skills.map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill}</Text>
            ))}
          </View>
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {DATA.projects.map((project, index) => (
            <View key={index} style={styles.projectItem}>
              <Link src={project.href} style={[styles.projectTitle, styles.link]}>
                {project.title} →
              </Link>
              <Text style={styles.text}>{project.description}</Text>
              <Text style={styles.text}>Technologies: {project.technologies.join(', ')}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default Resume;