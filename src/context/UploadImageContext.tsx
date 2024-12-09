import React, {
  ReactNode,
  useState,
  useEffect,
  ChangeEvent,
  createContext,
} from "react";

// Types for the props and state management
interface ProfileImageProps {
  profileImage: string | null;
  updateProfileImage: (imageUrl: string) => void;
  picture: string | null;
  uploadingProcess: string | null;
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  objInput: ObjEntriesState;
  setProfileImage: (imageUrl: string) => void;
}

interface ObjEntriesState {
  image: string | null;
  upload: boolean;
  success: string;
  error: string;
}

interface ChildrenProps {
  children: ReactNode;
}

// Set default values for the context
const defaultProfileImageProps: ProfileImageProps = {
  profileImage: null,
  updateProfileImage: () => {},
  picture: null,
  uploadingProcess: null,
  handleImageUpload: () => {},
  objInput: { image: null, upload: false, success: "", error: "" },
  setProfileImage: () => {},
};

// Create context for uploading image and updating profile image
export const UploadImageContext = createContext<ProfileImageProps>(
  defaultProfileImageProps
);

const UploadImageContextProvider = ({ children }: ChildrenProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const updateProfileImage = (imageUrl: string) => {
    setProfileImage(imageUrl);
  };

  // State to track the image upload status and messages
  const [objInput, setObjInput] = useState<ObjEntriesState>({
    image: null,
    upload: false,
    success: "",
    error: "",
  });

  // Reset success and error messages after 3 seconds
  useEffect(() => {
    if (objInput.success || objInput.error) {
      const timeout = setTimeout(() => {
        setObjInput((prev) => ({
          ...prev,
          success: "",
          error: "",
        }));
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [objInput.success, objInput.error]);

  // Handle image file upload and preview
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type (JPG, PNG, GIF)
    const isValidImage = /\.(jpe?g|png|gif)$/i.test(file.name);
    if (isValidImage) {
      setObjInput((prev) => ({
        ...prev,
        image: null,
        upload: true,
        success: "",
        error: "",
      }));

      const reader = new FileReader();

      // Successful upload: update image and set success message
      reader.onload = () => {
        setTimeout(() => {
          setObjInput((prev) => ({
            ...prev,
            image: reader.result as string,
            upload: false,
            success: "Image uploaded successfully!",
            error: "",
          }));
        }, 2000);
      };

      // Failed upload: set error message
      reader.onerror = () => {
        setTimeout(() => {
          setObjInput((prev) => ({
            ...prev,
            image: null,
            upload: false,
            success: "",
            error: "Failed to upload image. Please try again.",
          }));
        }, 2000);
      };

      reader.readAsDataURL(file);
    } else {
      // Invalid file type: show error message
      setTimeout(() => {
        setObjInput((prev) => ({
          ...prev,
          image: null,
          success: "",
          error: "Invalid file type. Please upload a JPG, PNG, or GIF ⚠️",
          upload: false,
        }));
      }, 2000);
    }
  };

  const picture = objInput.image;
  const uploadingProcess = objInput.upload ? "Uploading..." : null;

  return (
    <UploadImageContext.Provider
      value={{
        profileImage,
        updateProfileImage,
        picture,
        uploadingProcess,
        handleImageUpload,
        objInput,
        setProfileImage,
      }}
    >
      {children}
    </UploadImageContext.Provider>
  );
};

export default UploadImageContextProvider;
