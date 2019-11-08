import React, { useEffect, useState } from 'react';
import styles from './GraphNodeModal.module.css';
import { Modal } from '../Modal/Modal';
import DataBox from '../DataBox/DataBox';
import { Drawer } from '../Drawer/Drawer';
import { Course, Vertex } from '../graphTypes';
import { getCourse } from '../graphApi';

export function GraphNodeModal({
  open,
  onClose,
  vertex,
}: {
  open: boolean;
  onClose: () => void;
  vertex: Vertex;
}) {
  const [selectedCourse, setSelectedCourse] = useState<string>();
  const [courseInfo, setCourseInfo] = useState<Course>();

  useEffect(() => {
    if (!selectedCourse) return;

    (async () => {
      try {
        const course = await getCourse(selectedCourse);
        setCourseInfo(course);
      } catch (e) {
        setSelectedCourse(undefined);
      }
    })();
  }, [selectedCourse]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.mainContainer}>
        <h3 className={styles.title}>{vertex.name}</h3>

        {vertex.courseList.length > 0 ? (
          <>
            <div className={styles.boxGrid}>
              {vertex.courseList.map(course => (
                <DataBox
                  key={course}
                  title={course}
                  onClick={() => setSelectedCourse(course)}
                />
              ))}
            </div>

            <Drawer
              open={selectedCourse != null}
              onClose={() => setSelectedCourse(undefined)}
            >
              <div style={{ padding: 8 }}>
                <h3>{selectedCourse}</h3>
                {courseInfo && <p>{JSON.stringify(courseInfo)}</p>}
              </div>
            </Drawer>
          </>
        ) : (
          <div>No courses available</div>
        )}
      </div>
    </Modal>
  );
}
