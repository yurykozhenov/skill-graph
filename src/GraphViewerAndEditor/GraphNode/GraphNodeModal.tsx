import React, { useState } from 'react';
import styles from './GraphNodeModal.module.css';
import { Modal } from '../../shared/Modal/Modal';
import DataBox from '../../shared/DataBox/DataBox';
import { Drawer } from '../../shared/Drawer/Drawer';
import { Course, Vertex } from '../../graphTypes';

export function GraphNodeModal({
  open,
  onClose,
  vertex,
}: {
  open: boolean;
  onClose: () => void;
  vertex: Vertex;
}) {
  const [selectedCourse, setSelectedCourse] = useState<Course>();

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.mainContainer}>
        <h3 className={styles.title}>{vertex.name}</h3>

        {vertex.courseList.length > 0 ? (
          <>
            <div className={styles.boxGrid}>
              {vertex.courseList.map(course => (
                <DataBox
                  key={course.name}
                  title={course.name}
                  onClick={() => setSelectedCourse(course)}
                />
              ))}
            </div>

            <Drawer
              open={selectedCourse != null}
              onClose={() => setSelectedCourse(undefined)}
            >
              {selectedCourse && (
                <div style={{ padding: 8 }}>
                  <h3>{selectedCourse.name}</h3>

                  <a href={selectedCourse.link}>{selectedCourse.link}</a>

                  <h4>Difficulty</h4>
                  <p>{selectedCourse.difficulty}</p>

                  <h4>Description</h4>
                  {selectedCourse.description
                    .split('\n')
                    .map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                </div>
              )}
            </Drawer>
          </>
        ) : (
          <div>No courses available</div>
        )}
      </div>
    </Modal>
  );
}
