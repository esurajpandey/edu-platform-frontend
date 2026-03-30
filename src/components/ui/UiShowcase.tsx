"use client";

import { useState } from "react";
import Button from "./Button";
import Checkbox from "./Checkbox";
import DatePicker from "./DatePicker";
import InputBox from "./InputBox";
import Modal from "./Modal";

export default function UiShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="mt-8 grid gap-4 rounded-[24px] border border-surfaceSoft bg-surface p-5 shadow-sm md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              UI Components
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text">
              Typed, reusable form primitives
            </h2>
            <p className="mt-2 text-sm text-textLight">
              Buttons, fields, and modal patterns now live under the shared components layer.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button label="Primary action" />
            <Button label="Secondary" variant="outline" tone="neutral" />
            <Button
              label="Open modal"
              variant="soft"
              tone="primary"
              leadingIcon={{ name: "plus" }}
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <InputBox
            id="showcase-name"
            label="Student name"
            placeholder="Enter full name"
            variant="filled"
          />
          <DatePicker
            id="showcase-date"
            label="Joining date"
            description="Wrapped native picker with shared styling and typed props."
            variant="filled"
          />
          <Checkbox
            id="showcase-checkbox"
            label="Notify guardians"
            description="Reusable checkbox with consistent states and spacing."
          />
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Customizable modal"
        description="This modal uses the shared component API and supports typed sizes plus flexible content."
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="ghost" tone="neutral" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Save changes</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <InputBox
            id="modal-title"
            label="Title"
            defaultValue="Admission reminder"
            variant="filled"
          />
          <DatePicker
            id="modal-date"
            label="Reminder date"
            defaultValue="2026-03-28"
            variant="filled"
          />
        </div>
      </Modal>
    </>
  );
}
