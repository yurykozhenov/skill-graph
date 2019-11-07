import React from 'react';
import { Vertex } from '../graphApi';
import styles from './GraphNodeModal.module.css';
import { Modal } from '../Modal/Modal';

export function GraphNodeModal({
  open,
  onClose,
  vertex,
}: {
  open: boolean;
  onClose: () => void;
  vertex: Vertex;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.container}>
        <h3 className={styles.title}>{vertex.name}</h3>

        {vertex.courseList.length > 0 ? (
          <ul className={styles.list}>
            {vertex.courseList.map(course => (
              <li key={course}>{course}</li>
            ))}
          </ul>
        ) : (
          <div>No courses</div>
        )}
      </div>
    </Modal>
  );
}
