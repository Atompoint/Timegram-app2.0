import { refs } from "./config";

const ERRORS = {
  "firestore doc file limit exceeded": {
    code: "firestore doc file limit exceeded",
    message: ({ email, size, length }) =>
      `User: ${email}. Highlights size: ${size}bytes. Number of highlights: ${length}`,
  },
};

export const reportError = ({ code, details }) => {
  refs.errors.doc().set({
    code,
    message: ERRORS[code].message({ ...details }),
    meta: { createdAt: new Date() },
  });
};
